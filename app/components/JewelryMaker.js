"use client";

import Star from "../../public/icons/star.svg";

import { useState, useEffect } from "react";
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

import { orderService } from "../lib/api";

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
      <div className="flex justify-center items-center mb-2 rounded cursor-pointer aspect-square">
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
    diameter: 10,
    stock: 100,
    image: "/images/pink-butterfly.png"
  },
  {
    id: "purple-heart", 
    name: "💖",
    colour: "purple",
    shape: "heart",
    diameter: 8,
    stock: 100,
    image: "/images/purple-heart.png"
  },
  {
    id: "blue-star",
    name: "✨",
    colour: "blue",
    shape: "star", 
    diameter: 12,
    stock: 100,
    image: "/images/blue-star.png"
  },
  {
    id: "yellow-flower",
    name: "🌺",
    colour: "yellow",
    shape: "flower",
    diameter: 15,
    stock: 100,
    image: "/images/yellow-flower.png"
  },
  {
    id: "red-heart",
    name: "❤️", 
    colour: "red",
    shape: "heart",
    diameter: 8,
    stock: 100,
    image: "/images/red-heart.png"
  },
  {
    id: "white-circle",
    name: "⚪",
    colour: "white",
    shape: "circle",
    diameter: 6,
    stock: 100,
    image: "/images/white-circle.png"
  },
  {
    id: "black-cube",
    name: "⬛",
    colour: "black", 
    shape: "cube",
    diameter: 10,
    stock: 100,
    image: "/images/black-cube.png"
  }
];

const JewelryMaker = () => {
  const [items, setItems] = useState([]);
  const paletteItems = examplePaletteItems;

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

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
        stock: item.stock,
        image: item.image,
        diameter: item.diameter,
        colour: item.colour,
        shape: item.shape
      };
      return [newItem, ...prev];
    });
  };

  const handleOrderSubmit = async () => {
    console.log(items);
    // try {
    //   const orderData = {
    //     orderInfo: {
    //       status: "pending",
    //     },
    //     customerInfo: {
    //       email: "test",
    //       address: "test",
    //     },
    //   };

    //   await orderService.createOrder(orderData);
    // } catch (err) {
    //   console.error("Error creating order:", err);
    // }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center text-3xl">
      <div className="flex-wrap sm:flex-nowrap w-full h-[calc(90%-40px)] flex gap-8 justify-center items-center text-3xl">
        <div className="w-full h-full p-4 bg-backgroundDark rounded-3xl border-4 border-primaryLight justify-center items-center overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext
              items={items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((item) => (
                <SortableItem key={item.id} item={item} id={item.id} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
        <div className="w-full h-full flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center space-y-6">
            <h3 className="font-darumadrop text-primary text-4xl">Bead Tray</h3>
            <div id="filters" className="w-full flex justify-between">
              <div className="flex justify-around space-x-2">
<<<<<<< HEAD
                <button className="font-inclusiveSans text-xl rounded-full px-3 py-1 border-2 border-textDark text-textDark hover:bg-primaryLight hover:border-primaryLight transition ease-in-out duration-200 active:bg-primary active:text-background active:border-primary">shape</button>
                <button className="font-inclusiveSans text-xl rounded-full px-3 py-1 border-2 border-textDark text-textDark hover:bg-primaryLight hover:border-primaryLight transition ease-in-out duration-200 active:bg-primary active:text-background active:border-primary">color</button>
                <button className="font-inclusiveSans text-xl rounded-full px-3 py-1 border-2 border-textDark text-textDark hover:bg-primaryLight hover:border-primaryLight transition ease-in-out duration-200 active:bg-primary active:text-background active:border-primary">size</button>
              </div>
              <button className="group text-xl ml-2 rounded-full px-2 border-2 border-textDark text-textDark hover:bg-primaryLight hover:border-primaryLight transition ease-in-out duration-200 active:bg-primary active:text-background active:border-primary">
                <svg className="group-active:text-background" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M15.5569 18.9951C15.3966 18.9957 15.2385 18.958 15.0959 18.8851L9.98497 16.2164L4.87405 18.8851C4.70808 18.9722 4.52097 19.011 4.33397 18.9973C4.14697 18.9835 3.96759 18.9178 3.81621 18.8074C3.66484 18.697 3.54755 18.5465 3.47768 18.3729C3.4078 18.1994 3.38814 18.0098 3.42094 17.8256L4.42308 12.1983L0.294259 8.20022C0.165441 8.072 0.0740596 7.91122 0.0299215 7.73513C-0.0142167 7.55904 -0.00944543 7.37428 0.0437232 7.20069C0.101807 7.02305 0.208652 6.86521 0.352133 6.74507C0.495613 6.62493 0.669984 6.54731 0.855458 6.52102L6.56767 5.69141L9.08304 0.563842C9.1651 0.394852 9.29323 0.252333 9.45274 0.152611C9.61226 0.0528901 9.79671 0 9.98497 0C10.1732 0 10.3577 0.0528901 10.5172 0.152611C10.6767 0.252333 10.8048 0.394852 10.8869 0.563842L13.4323 5.68141L19.1445 6.51102C19.33 6.53731 19.5044 6.61493 19.6479 6.73507C19.7913 6.85521 19.8982 7.01306 19.9563 7.1907C20.0094 7.36429 20.0142 7.54905 19.9701 7.72514C19.9259 7.90123 19.8346 8.06201 19.7057 8.19022L15.5769 12.1883L16.5791 17.8157C16.6148 18.003 16.5961 18.1967 16.5251 18.3738C16.454 18.551 16.3337 18.7041 16.1782 18.8152C15.9967 18.942 15.7782 19.0053 15.5569 18.9951Z"/>
                </svg>
=======
                <button className="font-inclusiveSans text-xl rounded-full px-5 py-1 border-2 border-textDark text-textDark hover:bg-primaryLight hover:border-primaryLight transition ease-in-out duration-200 active:bg-primary active:text-background active:border-primary">
                  shape
                </button>
                <button className="font-inclusiveSans text-xl rounded-full px-5 py-1 border-2 border-textDark text-textDark hover:bg-primaryLight hover:border-primaryLight transition ease-in-out duration-200 active:bg-primary active:text-background active:border-primary">
                  colour
                </button>
                <button className="font-inclusiveSans text-xl rounded-full px-5 py-1 border-2 border-textDark text-textDark hover:bg-primaryLight hover:border-primaryLight transition ease-in-out duration-200 active:bg-primary active:text-background active:border-primary">
                  size
                </button>
              </div>
              <button className="text-xl rounded-full px-5 border-2 border-textDark text-textDark">
                ⭐️
>>>>>>> f98a78c0b82f7c94fa57c81f11a5ce6990ed0772
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pr-4 overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-primary/20 [&::-webkit-scrollbar-thumb]:rounded-full">
            {paletteItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleAddItem(item)}
                className="bg-backgroundDark rounded-lg aspect-square hover:bg-background hover:scale-110 active:scale-125 transition ease-in-out duration-200"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-[40px] flex items-center justify-around rounded-lg">
        <div className="w-full flex justify-center">
<<<<<<< HEAD
          <button className="font-darumadrop bg-primary text-background text-2xl px-5 py-2 rounded-3xl">Order</button>
=======
          <button
            onClick={handleOrderSubmit}
            className="bg-primary text-background text-xl p-2 rounded-3xl"
          >
            Order
          </button>
>>>>>>> f98a78c0b82f7c94fa57c81f11a5ce6990ed0772
        </div>
        <div className="w-full flex justify-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-textLight rounded-full"></div>
            <p className="text-textLight text-base">1-3mm</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-textLight rounded-full"></div>
            <p className="text-textLight text-base">4-7mm</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-textLight rounded-full"></div>
            <p className="text-textLight text-base"> &gt; 8mm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JewelryMaker;
