"use client";

import { useState, useEffect } from "react";
import { DndContext, TouchSensor, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from "uuid";
const SortableItem = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full flex justify-center items-center"
    >
      <div className="w-[20%] flex justify-center items-center p-4 mb-2 rounded cursor-pointer bg-white aspect-square">
        {item.name}
      </div>
    </div>
  );
};

const examplePaletteItems = [
  {
    id: "pink-butterfly",
    name: "🦋",
    colour: "pink",
    shape: "butterfly",
  },
  {
    id: "purple-heart",
    name: "💖",
    colour: "purple",
    shape: "heart",
  },
  {
    id: "blue-star",
    name: "✨",
    colour: "blue",
    shape: "star",
  },
  {
    id: "yellow-flower",
    name: "🌺",
    colour: "yellow",
    shape: "flower",
  },
  {
    id: "red-rose",
    name: "🌹",
    colour: "red",
    shape: "rose",
  },
  {
    id: "orange-sun",
    name: "☀️",
    colour: "orange",
    shape: "sun",
  },
  {
    id: "green-leaf",
    name: "🍃",
    colour: "green",
    shape: "leaf",
  },
  {
    id: "blue-droplet",
    name: "💧",
    colour: "blue",
    shape: "droplet",
  },
  {
    id: "purple-crystal",
    name: "💎",
    colour: "purple",
    shape: "crystal",
  },
  {
    id: "pink-ribbon",
    name: "🎀",
    colour: "pink",
    shape: "ribbon",
  },
  {
    id: "yellow-star",
    name: "⭐",
    colour: "yellow",
    shape: "star",
  },
  {
    id: "red-heart",
    name: "❤️",
    colour: "red",
    shape: "heart",
  },
];

const JewelryMaker = () => {
  const [items, setItems] = useState([]);
  const paletteItems = examplePaletteItems;

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddItem = (item) => {
    setItems((prev) => {
      const newItem = {
        id: uuidv4(),
        name: item.name,
      };
      return [newItem, ...prev];
    });
  };

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center text-3xl">
      <div className="w-full h-[calc(90%-40px)] flex gap-4 justify-center items-center text-3xl">
        <div className="w-full h-full p-4 bg-backgroundDark rounded-3xl border-4 border-primaryLight justify-center items-center overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext
              items={items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((item) => (
                <SortableItem key={item.id} item={item} id={item.id}/>
              ))}
            </SortableContext>
          </DndContext>
        </div>
        <div className="w-full h-full flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center space-y-8">
            <h3 className="font-darumadrop text-primary text-4xl">Bead Tray</h3>
            <div id="filters" className="w-full flex justify-between">
              <div className="flex justify-around space-x-2">
                <button className="font-inclusiveSans text-xl rounded-full px-5 py-1 border-2 border-textDark text-textDark hover:bg-primaryLight hover:border-primaryLight transition ease-in-out duration-200 active:bg-primary active:text-background active:border-primary">shape</button>
                <button className="font-inclusiveSans text-xl rounded-full px-5 py-1 border-2 border-textDark text-textDark hover:bg-primaryLight hover:border-primaryLight transition ease-in-out duration-200 active:bg-primary active:text-background active:border-primary">colour</button>
                <button className="font-inclusiveSans text-xl rounded-full px-5 py-1 border-2 border-textDark text-textDark hover:bg-primaryLight hover:border-primaryLight transition ease-in-out duration-200 active:bg-primary active:text-background active:border-primary">size</button>
              </div>
              <button className="text-xl rounded-full px-5 border-2 border-textDark text-textDark">⭐️</button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pr-4 overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-primary/20 [&::-webkit-scrollbar-thumb]:rounded-full">
            {paletteItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleAddItem(item)}
                className="bg-backgroundDark rounded-lg aspect-square"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-[40px] flex items-center justify-around rounded-lg">
        <div className="w-full flex justify-center">
          <button className="bg-primary text-background text-xl p-2 rounded-3xl">Order</button>
        </div>
        <div className="w-full flex justify-center">
          <div>put the circles here</div>
        </div>
      </div>
    </div>
  );
};

export default JewelryMaker;
