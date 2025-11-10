"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import BeadBox from "./BeadBox";
import FilterBar from "./FilterBar";
import Header from "./Header";
import BeadMenu from "./BeadMenu";
import useClickOutside from "../../hooks/useClickOutside";
import JewelryTypes from "./JewelryTypes";

import XIcon from "../../public/icons/x-icon.svg";
import DropdownArrow from "../../public/icons/dropdown-arrow.svg";
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

//make an item sortable
const SortableItem = ({ item, activeBead, showBeadMenu, setShowBeadMenu, onMenuClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.dragId });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: activeBead?.dragId === item.dragId ? 0 : 1,
  };

  const scaledSize = item.diameter * 6;

  const isOpen = (showBeadMenu === item.dragId);
  const containerRef = useClickOutside(() => setShowBeadMenu(null), isOpen);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-fit flex justify-center items-center"
    >
      <div ref={containerRef} className="relative">
          <div className="cursor-pointer">
            <Image
              className="m-1 w-auto h-auto object-cover place-self-center hover:opacity-80 hover:scale-110 transition ease-in-out"
              src={item.imagePath}
              width={50}
              height={50}
              style={{ height: `${scaledSize}px` }} 
              alt="Draggable bead"
              onPointerUp={() => {
                // show item menu on click and after a drag 
                console.log("dragId: " + item.dragId);
                setShowBeadMenu(prev => (prev === item.dragId ? null : item.dragId));
                console.log("showBeadMenu: " + showBeadMenu);
              }}
            />
          </div>
          {isOpen && (
            <BeadMenu beadId={item.dragId} diameter={item.diameter} price={item.price} 
                      onMenuClick={onMenuClick}/>
          )}
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
  const [showBeadMenu, setShowBeadMenu] = useState(null);
  const [showTypeModal, setShowTypeModal] = useState(false);

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
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      }
    }), 
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
    console.log("data", data);
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

  const handleDeleteItem = (item) => {
    setSelectedBeads((prev) => prev.filter((bead) => bead.dragId !== item.dragId));

    // Update totals
    setTotal(() => {
      if (selectedBeads.length == 1) {
        return 0;
      } else {
        return (totalSum(selectedBeads.filter((bead) => bead.dragId !== item.dragId)) / 100) + 5;
      }
    });
    setLength(totalLength(selectedBeads.filter((bead) => bead.dragId !== item.dragId)));
    return;
  };

  return(
    <div className="overscroll-hidden relative flex flex-col-reverse md:flex-row w-screen font-inclusiveSans text-textDark">
      {/* Side bar */}
      <section className="fixed flex flex-col bg-background w-fit place-self-center md:place-self-auto md:min-w-[480px] md:w-auto shrink-0 md:pt-6 md:px-6 md:static top-[50vh]">
        <div className="hidden md:block md:mb-5 md:mt-3">
          <Header />
        </div>
        <div className="w-full md:pr-0 md:static flex items-center justify-end md:justify-between text-sm my-2 md:mb-4 text-textDark">
          <div className="hidden md:block">
            <FilterBar filters={filters} setFilters={setFilters} />
            {/* <button className="group flex gap-2 items-center text-textDark">
              <p className="underline group-hover:no-underline">Recommended</p>
              <Image src={dropdownArrow} alt="" aria-hidden="true" />
            </button> */}
          </div>
          <button className="flex md:hidden items-center gap-2 h-fit bg-[#FDF8F3] px-3 py-2 rounded-xl border-[1.5px] border-textDark hover:border-primaryDark hover:text-primaryDark transition duration-75"
                  onClick={() => setShowTypeModal(true)}>
            <p>Keychain</p>
            <DropdownArrow />
          </button>
        </div>
        <div className="grow grid w-full h-[50vh] md:static">
          <div className="grid place-self-center w-fit grid-cols-3 gap-2 max-h-full overflow-y-scroll pb-20 md:pb-6 md:mt-0">
            {Array.isArray(beads) &&
              beads.map((item) => (
              <div key={item.id} className="grid place-self-center">
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
      <section className="fixed w-[100vw] top-0 md:relative border-[1.5px] border-backgroundDark bg-backgroundDark/15 md:grow h-[50vh] md:h-[100vh] flex flex-col bg-[url('/dot-grid.svg')] bg-repeat [-webkit-touch-callout:none] [-webkit-user-drag:none] [ -webkit-user-select:none ] select-none ">
        <div className="absolute md:hidden block p-2">
          <Header />
        </div>
        <div className="absolute h-fit w-full bottom-0 md:top-0 p-2 md:p-6 right-0 flex justify-end md:items-start md:justify-between">
          <div className="hidden md:block">
            <JewelryTypes />
          </div>
          <div className="flex flex-row-reverse justify-between w-full md:flex-col items-end z-10 user-select-none">
            <button
              onClick={handleOrderSubmit}
              className={`flex gap-2 px-5 py-4 rounded-2xl transition ease-in-out duration-75 ${
                selectedBeads.length === 0
                  ? "bg-backgroundDark cursor-not-allowed"
                  : "bg-secondary hover:bg-secondaryLight cursor-pointer"
              }`}
              disabled={selectedBeads.length === 0}
            >
              <p className="hidden md:block">Order</p>
              <span className="font-sans">→</span>
            </button>
            <div className="bg-backgroundDark/40 text-textLight mt-3 px-4 py-2 flex-col items-baseline text-left md:text-right rounded-xl">
              <p className="text-base/tight text-textDark">
                ${total.toFixed(2)}
              </p>
              <p className="text-sm">{(length / 10).toFixed(1)} cm</p>
            </div>
          </div>
        </div>
        <div className="z-10 grow h-[40vh] md:h-[97vh] w-fit relative place-self-center">
          <div className="flex flex-col justify-center items-center w-fit h-full max-h-full overflow-y-scroll px-32 -mx-32 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* DRAG AND DROP AREA */}
            <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}> 
              <Image className="w-[60px] md:w-[80px] m-1" src={lobsterClasp} width={400} height={400} alt="clasp"/>
              <SortableContext                                                                                                                                                                                                                                        
                items={selectedBeads.map((item) => item.dragId)}
                strategy={verticalListSortingStrategy}
              >
                {selectedBeads.map((item) => (
                  <SortableItem
                    key={item.dragId}
                    item={item}
                    activeBead={activeBead}
                    showBeadMenu={showBeadMenu}
                    setShowBeadMenu={setShowBeadMenu}
                    onMenuClick={() => {
                                  console.log("TRASH CLICKEDDD, id: " + item.dragId);
                                  handleDeleteItem(item);
                                }}
                  />
                ))}
              </SortableContext>

              <DragOverlay>
                {activeBead ? (
                  <div className="w-full flex justify-center items-center pointer-events-none">
                    <Image
                      className="h-auto place-self-center opacity-75"
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
        </div>

        <div className="absolute bottom-0 right-0 p-6 flex items-end justify-end">
          <div className="bg-backgroundDark/60 md:flex h-fit items-center rounded-2xl hidden">
          {/* undo/redo icons for later */}
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
              <XIcon />
            </button>
          </div>
        </div>
      </section>
      {showResetWarning && selectedBeads.length > 0 && (
        <ResetModal 
          onCancel={() => {setShowResetWarning(false)}}
          onConfirm={handleReset}
        />
      )}
      {showTypeModal && (
        <TypeModal 
          onReturn={() => {setShowTypeModal(false)}}
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

const TypeModal = ({
  onReturn,
}) => {
  return(
    <div className="fixed inset-0 flex flex-col items-center justify-center backdrop-blur-lg bg-opacity-30 bg-background z-50 space-y-6">
      <div className="w-56 text-center space-y-3">
        <h2 className="font-darumadrop text-2xl">Jewelry Type</h2>
        <p className="text-base/5">Create a new type of jewelry! <br/> Selecting a new type will reset all progress. </p>
      </div>
      <JewelryTypes />
      <p className="underline text-textLight"
          onClick={onReturn}>Return to Maker</p>
    </div>
  )
};