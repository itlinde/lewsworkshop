"use client";

import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
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
      className="bg-blue-500 p-4 mb-2 rounded cursor-pointer"
    >
      Item {item.name}
    </div>
  );
};

const examplePaletteItems = [
  {
    id: "red-butterfly",
    name: "🦋 Red Butterfly",
    colour: "red",
    shape: "butterfly",
  },
  {
    id: "blue-star",
    name: "⭐ Blue Star",
    colour: "blue",
    shape: "star",
  },
  {
    id: "purple-heart",
    name: "💜 Purple Heart",
    colour: "purple",
    shape: "heart",
  },
  {
    id: "yellow-flower",
    name: "🌸 Yellow Flower",
    colour: "yellow",
    shape: "flower",
  },
  {
    id: "green-circle",
    name: "⭕ Green Circle",
    colour: "green",
    shape: "circle",
  },
  {
    id: "orange-cube",
    name: "⬛ Orange Cube",
    colour: "orange",
    shape: "cube",
  },
];

const JewelryMaker = () => {
  const [items, setItems] = useState([]);
  const paletteItems = examplePaletteItems;

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
      return [...prev, newItem];
    });
  };

  return (
    <div className="w-full h-[90%] flex gap-4 justify-center items-center bg-red-100 text-3xl">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="w-full h-full bg-red-300 p-4">
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((item) => (
              <SortableItem key={item.id} item={item} id={item.id} />
            ))}
          </SortableContext>
        </div>
        <div className="w-full h-full flex flex-col bg-red-300">
          Select Area
          {paletteItems.map((item) => (
            <button
              key={item.id}
              className="bg-blue-500 p-4 mb-2 rounded cursor-pointer"
              onClick={() => handleAddItem(item)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default JewelryMaker;
