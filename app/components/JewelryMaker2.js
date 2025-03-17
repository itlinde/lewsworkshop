"use client";

import Image from 'next/image';
import dotGrid from "../../public/dot-grid.svg";
import dropdownArrow from "../../public/icons/dropdown-arrow.svg";
import undoIcon from "../../public/icons/undo-icon.svg";
import redoIcon from "../../public/icons/redo-icon.svg";
import xIcon from "../../public/icons/x-icon.svg";
import { useEffect, useState } from "react";
import BeadBox from "./BeadBox";
import FilterBar from "./FilterBar";
import Header from "./Header";

import {
  DndContext,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
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
const SortableItem = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.dragId });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const scaledSize = item.diameter * 7;

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
          className="w-auto h-auto object-cover place-self-center"
          src={item.imagePath}
          width={400}
          height={400}
          style={{ height: `${scaledSize}px` }} 
          alt="beeaadddd"
        />
      </div>
    </div>
  );
}

const totalSum = (items) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

const totalLength = (items) => {
  return items.reduce((sum, item) => sum + item.diameter, 0);
};

const JewelryMaker2 = () => {
  const [beads, setBeads] = useState([]);
  const [selectedBeads, setSelectedBeads] = useState([]);
  const [total, setTotal] = useState(0.00);
  const [length, setLength] = useState(0.0);
  const [filters, setFilters] = useState({ colour: "", size: "", shape: "" });

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

  const sensors = useSensors (
    useSensor(MouseSensor), 
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200, // Requires hold for 200ms before dragging starts
        tolerance: 5, // Allows minor movement before triggering drag
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

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
      setTotal(totalSum(newBeads) * 6);
      setLength(totalLength(newBeads));
      return newBeads;
    });
  };

  return(
    <div className="overscroll-hidden relative flex flex-col-reverse md:flex-row w-screen font-inclusiveSans text-textDark">
      {/* Side bar */}
      <section className="flex flex-col bg-background h-dvh md:min-w-[480px] md:w-auto shrink-0 md:p-6 absolute md:static top-[50vh]">
        <div className="hidden md:block">
          <Header/>
        </div>
        <div className="fixed w-full px-2 md:pr-0 md:static flex items-center justify-between text-sm mt-2 mb-4 text-textDark">
          <FilterBar filters={filters} setFilters={setFilters}/>
          <button className="group flex gap-2 items-center text-textDark">
            <p className="underline group-hover:no-underline">Recommended</p>
            <Image src={dropdownArrow} alt="" aria-hidden="true"/>
          </button>
        </div>
        <div className="grow fixed w-full h-[50vh] md:static">
          <div className="grid place-self-center grid-cols-3 gap-2 max-h-full overflow-y-scroll pb-20 md:pb-0 mt-12 md:mt-0">
            {Array.isArray(beads) && beads.map((item) => (
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
      <section className="fixed w-[100vw] top-0 md:relative border-[1.5px] border-backgroundDark bg-backgroundDark/15 md:grow flex flex-col h-[50vh] md:h-[100vh] p-2 md:p-6">
        <Image className="-z-10 absolute top-0 left-0 object-none object-left-top max-h-full max-w-full" priority src={dotGrid} alt="" aria-hidden="true"/>
        <div className="md:hidden block p-2">
          <Header/>
        </div>
        <div className="z-10 absolute w-full bottom-0 md:top-0 p-2 md:p-6 right-0 flex justify-end md:items-start md:justify-between">
          <div className="hidden md:flex gap-3">
            <button className="cursor-default bg-[#FDF8F3] px-5 py-2 rounded-2xl border-[1.5px] border-textDark hover:border-primaryDark hover:text-primaryDark transition duration-75">Keychain</button>
            {/* <button disabled className="cursor-not-allowed bg-backgroundDark px-5 py-2 rounded-2xl border-[1.5px] border-textLight/40 text-textLight/40">Earrings</button>
            <button disabled className="cursor-not-allowed bg-backgroundDark px-5 py-2 rounded-2xl border-[1.5px] border-textLight/40 text-textLight/40">Bracelet</button>
            <button disabled className="cursor-not-allowed bg-backgroundDark px-5 py-2 rounded-2xl border-[1.5px] border-textLight/40 text-textLight/40">Necklace</button> */}
          </div>
          {/* <button className="bg-secondary px-5 py-4 rounded-2xl hover:bg-secondaryLight transition ease-in-out duration-75">
            Order <span className="font-sans">→</span>
          </button> */}
          <div className="flex-col flex items-end">
            <button disabled className="cursor-not-allowed w-fit bg-backgroundDark text-textLight/40 px-5 py-4 rounded-2xl transition ease-in-out duration-75">
              Order <span className="font-sans">→</span>
            </button>
            <p className="mt-2 w-48 text-xs text-textLight text-right">
              When you're ready to order, send a screenshot to 
              <a className="underline hover:no-underline" href="https://www.instagram.com/lewsworkshop/"> @lewsworkshop </a> 
              on Instagram, and we'll send you a purchase link!
            </p>
          </div>
        </div>
        <div className="grow h-[40vh] md:h-[97vh] relative">
          <div className="flex flex-col justify-center h-full max-h-full px-10 overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* DRAG AND DROP AREA */}
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
              <SortableContext                                                                                                                                                                                                                                        
                items={selectedBeads.map((item) => item.dragId)}
                strategy={verticalListSortingStrategy}
              >
                {selectedBeads.map((item) => (
                  <SortableItem
                    key={item.dragId}
                    item={item}
                    dragId={item.dragId}
                  />
                ))}
              </SortableContext>
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
          <div className="absolute bottom-0 w-full flex items-end justify-between md:mb-6">
            <div>
              <p className="text-sm md:text-base mb-2 text-textLight">Total: ${(total).toFixed(2)}</p>
              <div className="bg-backgroundDark/40 px-4 py-2 gap-3 inline-flex items-baseline rounded-2xl">
                <p className="text-sm md:text-3xl">{length} mm</p>
                <p className="text-sm text-textLight">{(length * 0.0393701).toFixed(2)} in</p>
              </div>
            </div>
            <div className="bg-backgroundDark/60 md:flex h-fit items-center rounded-2xl hidden">
              {/* <button className="p-2 rounded-xl hover:bg-background transition ease-in-out duration-75">
                <Image src={undoIcon} alt=""/> 
              </button>
              <button className="p-2 rounded-xl hover:bg-background transition ease-in-out duration-75">
                <Image src={redoIcon} alt=""/> 
              </button>
              <button className="p-2 rounded-xl hover:bg-accent transition ease-in-out duration-75">
                <Image src={xIcon} alt=""/>
              </button> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JewelryMaker2;
