"use client";

import Image from "next/image";
import dotGrid from "../../public/dot-grid.svg";
import dropdownArrow from "../../public/icons/dropdown-arrow.svg";
import undoIcon from "../../public/icons/undo-icon.svg";
import redoIcon from "../../public/icons/redo-icon.svg";
import xIcon from "../../public/icons/x-icon.svg";
import redTrashIcon from "../../public/icons/trash-icon.svg";
import darkTrashIcon from "../../public/icons/trash-icon-dark.svg";
import { useEffect, useState } from "react";
import BeadBox from "./BeadBox";
import FilterBar from "./FilterBar";
import Header from "./Header";
import lobsterClasp from "../../public/lobster-clasp.png";

import {
  DndContext,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from "uuid";

const TrashBin = () => {
  const { setNodeRef, isOver } = useDroppable({ id: "delete-zone" });

  return (
    <div
      style={{ width: '64px', height: '64px' }}
      ref={setNodeRef}
      className={`z-50 absolute bottom-16 right-0 w-16 h-16 flex items-center justify-center rounded-2xl 
        ${isOver ? "bg-failRed/60 scale-110" : "bg-failRed/20 border-[1.5px] border-failRed"}
        transition-all duration-200`}
    >
      <Image className={`w-5 h-5 ${isOver ? "hidden" : "block"} transition-all duration-200`} src={redTrashIcon} alt="Delete" width={40} height={40} />
      <Image className={`w-5 h-5 ${isOver ? "block" : "hidden"} transition-all duration-200`} src={darkTrashIcon} alt="Delete" width={40} height={40} />
    </div>
  );
};

//make an item sortable
const SortableItem = ({ item, activeBead }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.dragId });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: activeBead?.dragId === item.dragId ? 0 : 1,
  };

  const scaledSize = item.diameter * 6;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full flex justify-center items-center"
    >
      <div className="cursor-pointer">
        <Image
          className="m-0.5 w-auto h-auto object-cover place-self-center hover:opacity-80 hover:scale-105 transition ease-in-out"
          src={item.imagePath}
          width={400}
          height={400}
          style={{ height: `${scaledSize}px` }} 
          alt="beeaadddd"
        />
      </div>
    </div>
  );
};

const totalSum = (items) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

const totalLength = (items) => {
  return items.reduce((sum, item) => sum + item.diameter, 0);
};

const JewelryMaker2 = () => {
  const [beads, setBeads] = useState([]);
  const [selectedBeads, setSelectedBeads] = useState([]);
  const [total, setTotal] = useState(0.0);
  const [length, setLength] = useState(0.0);
  const [filters, setFilters] = useState({ colour: "", size: "", shape: "" });
  const [activeBead, setActiveBead] = useState(null); // active bead = the bead being dragged
  const [showResetWarning, setShowResetWarning] = useState(false);

  // fetch beads from db & put into an array
  useEffect(() => {
    const run = async () => {
      const queryParams = new URLSearchParams(filters).toString();
      const res = await fetch(`/api/beads?${queryParams}`);
      const beadsData = await res.json();
      setBeads(beadsData);
    };
    run();
  }, [filters]);

  const sensors = useSensors(
    useSensor(MouseSensor), 
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200, // Requires hold for 200ms before dragging starts
        tolerance: 5, // Allows minor movement before triggering drag
      },
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    if (!active) return;
  
    // Find the bead being dragged
    const draggedBead = selectedBeads.find((item) => item.dragId === active.id);
    setActiveBead(draggedBead);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveBead(null); // clear DragOverlay state when dragging ends

    if (!over) return;

    // If dropped in trash bin, delete the bead
    if (over.id === "delete-zone") {
      setSelectedBeads((prev) => prev.filter((item) => item.dragId !== active.id));

      // Update totals
      setTotal(() => {
        if (selectedBeads.length == 1) {
          return 0;
        } else {
          return (totalSum(selectedBeads.filter((item) => item.dragId !== active.id)) / 100) + 5;
        }
      });
      setLength(totalLength(selectedBeads.filter((item) => item.dragId !== active.id)));
      return;
    }

    if (active.id !== over.id) {
      setSelectedBeads((items) => {
        const oldIndex = items.findIndex((item) => item.dragId === active.id);
        const newIndex = items.findIndex((item) => item.dragId === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddItem = (item) => {
    setSelectedBeads((prev) => {
      const newItem = {
        dragId: `${item.id}-${uuidv4()}`,
        id: item.id,
        name: item.name,
        stock: item.stock,
        imagePath: item.image_path,
        diameter: item.diameter_mm,
        colour: item.colour,
        shape: item.shape,
        price: item.price,
      };
      const newBeads = [...prev, newItem];
      setTotal((totalSum(newBeads) / 100) + 5);
      setLength(totalLength(newBeads));
      return newBeads;
    });
  };

  const handleOrderSubmit = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        price: total * 100, // stripe takes cents
        delivery_method: "pickup",
        beads: selectedBeads,
      }),
    });
    const data = await res.json();
    if (data.redirectUrl) {
      window.location.href = data.redirectUrl;
    }
  };

  const handleReset = () => {
    setSelectedBeads([]);
    setTotal(0);
    setLength(0);
    setShowResetWarning(false);
  }

  return(
    <div className="overscroll-hidden relative flex flex-col-reverse md:flex-row w-screen font-inclusiveSans text-textDark">
      {/* Side bar */}
      <section className="flex flex-col bg-background h-dvh md:min-w-[480px] md:w-auto shrink-0 md:p-6 absolute md:static top-[50vh]">
        <div className="hidden md:block">
          <Header />
        </div>
        <div className="fixed w-full px-2 md:pr-0 md:static flex items-center justify-between text-sm mt-2 mb-4 text-textDark">
          <FilterBar filters={filters} setFilters={setFilters} />
          {/* <button className="group flex gap-2 items-center text-textDark">
            <p className="underline group-hover:no-underline">Recommended</p>
            <Image src={dropdownArrow} alt="" aria-hidden="true" />
          </button> */}
        </div>
        <div className="grow fixed w-full h-[50vh] md:static">
          <div className="grid place-self-center grid-cols-3 gap-2 max-h-full overflow-y-auto pb-20 md:pb-0 mt-12 md:mt-0">
            {Array.isArray(beads) &&
              beads.map((item) => (
              <div key={item.id}>
                <BeadBox
                  onClick={(e) => handleAddItem(item, e)}
                  id={item.id}
                  imagePath={item.image_path}
                  price={item.price}
                  diameter={item.diameter_mm}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Canvas */}
      <section className="fixed w-[100vw] top-0 md:relative border-[1.5px] border-backgroundDark bg-backgroundDark/15 md:grow flex flex-col h-[50vh] md:h-[100vh] p-2 md:p-6 bg-[url('/dot-grid.svg')] bg-repeat">
        <div className="md:hidden block p-2">
          <Header />
        </div>
        <div className="z-10 absolute pt-20 h-fit w-full bottom-0 md:top-0 p-2 md:p-6 right-0 flex justify-end md:items-start md:justify-between">
          <div className=" md:flex gap-3">
            <button className="cursor-default bg-[#FDF8F3] px-5 py-2 rounded-2xl border-[1.5px] border-textDark hover:border-primaryDark hover:text-primaryDark transition duration-75">
              Keychain
            </button>
            <div className="group flex-col relative">
              <button disabled className=" bg-backgroundDark px-5 py-2 rounded-2xl border-[1.5px] border-textLight/40 text-textLight/40">
              Earrings
              <div data-tooltip="tooltip" data-tooltip-placement="{bottom}" className="absolute left-1 -bottom-8 text-textDark/65 text-sm bg-backgroundDark p-1 rounded-md opacity-0 group-hover:opacity-100 transition ease-in-out duration-300 delay-500">
                coming soon!
              </div>
              </button>
            </div>
            {/* <button disabled className="cursor-not-allowed bg-backgroundDark px-5 py-2 rounded-2xl border-[1.5px] border-textLight/40 text-textLight/40">Bracelet</button>
            <button disabled className="cursor-not-allowed bg-backgroundDark px-5 py-2 rounded-2xl border-[1.5px] border-textLight/40 text-textLight/40">Necklace</button> */}
          </div>
          <div className="flex-col flex items-end z-10">
            <button
              onClick={handleOrderSubmit}
              className={`px-5 py-4 rounded-2xl transition ease-in-out duration-75 ${
                selectedBeads.length === 0
                  ? "bg-backgroundDark cursor-not-allowed"
                  : "bg-secondary hover:bg-secondaryLight cursor-pointer"
              }`}
              disabled={selectedBeads.length === 0}
            >
              Order <span className="font-sans">→</span>
            </button>
            <div>
              <div className="bg-backgroundDark/40 text-textLight mt-3 px-4 py-2 flex-col items-baseline rounded-xl">
                <p className="text-lg text-textDark">
                  ${total.toFixed(2)}
                </p>
                <p className="text-base">{(length / 10).toFixed(1)} cm</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grow h-[40vh] md:h-[97vh] relative">
          <div className="flex flex-col justify-center items-center h-full max-h-full p-10 overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* DRAG AND DROP AREA */}
            <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}> 
              <TrashBin/>
              <Image className="w-[80px] m-1" src={lobsterClasp} width={400} height={400} alt="clasp"/>
              <SortableContext                                                                                                                                                                                                                                        
                items={selectedBeads.map((item) => item.dragId)}
                strategy={verticalListSortingStrategy}
              >
                {selectedBeads.map((item) => (
                  <SortableItem
                    key={item.dragId}
                    item={item}
                    dragId={item.dragId}
                    activeBead={activeBead}
                  />
                ))}
              </SortableContext>

              <DragOverlay>
                {activeBead ? (
                  <div className="w-full flex justify-center items-center pointer-events-none">
                    <Image
                      className="w-auto h-auto object-cover place-self-center opacity-75"
                      src={activeBead.imagePath}
                      width={400}
                      height={400}
                      style={{ height: `${activeBead.diameter * 7}px` }} 
                      alt="Dragging bead"
                    />
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>

          {/* sandbox bead preview */}
          {/* <div className="absolute top-0 left-0 flex gap-3 p-3 items-center bg-backgroundDark/60 text-sm rounded-2xl">
            <p>(BEAD)</p>
            <div className="justify-items-end">
              <div className="">
                <p>$0.75</p>
                <p>4 mm</p>
              </div>
              <p className="text-textLight/40">#11520</p>
            </div>
          </div> */}

          <div className="absolute bottom-0 w-full flex items-end justify-end md:mb-6">
            <div className="bg-backgroundDark/60 md:flex h-fit items-center rounded-2xl hidden">
              {/* <button className="p-2 rounded-xl hover:bg-background transition ease-in-out duration-75">
                <Image src={undoIcon} alt=""/> 
              </button>
              <button className="p-2 rounded-xl hover:bg-background transition ease-in-out duration-75">
                <Image src={redoIcon} alt=""/> 
              </button> */}
              <button 
                onClick={() => setShowResetWarning(selectedBeads.length > 0 ? true : false)}
                className={`p-2 rounded-xl transition ease-in-out duration-75 ${selectedBeads.length === 0 ? "cursor-not-allowed" : "hover:bg-failRed/60"}`}
              >
                <Image src={xIcon} alt=""/>
              </button>
            </div>
          </div>
        </div>
      </section>
      {showResetWarning && selectedBeads.length > 0 && (
        <ResetModal 
          onCancel={() => {setShowResetWarning(false)}}
          onConfirm={handleReset}
        />
      )}
    </div>
  );
};

export default JewelryMaker2;


const ResetModal = ({
  onConfirm,
  onCancel,
}) => {
  return(
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50 z-50">
      <div className="bg-background p-16 rounded-2xl shadow-md border-[1.5px] border-textLight/15">
        <p className="mb-6">Are you sure you want to restart? <br/> This will remove all selected beads.</p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={onCancel}
            className="px-5 py-3 bg-background text-textLight border-[1.5px] border-textLight rounded-2xl hover:bg-textLight/10 active:bg-textLight/25 transition"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="px-5 py-3 bg-background text-failRed border-[1.5px] border-failRed rounded-2xl hover:bg-failRed/15 active:bg-failRed/30 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
};