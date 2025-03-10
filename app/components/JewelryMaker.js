"use client";

import Image from "next/image";

import { useState } from "react";
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

const SortableItem = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.dragId });

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
        <Image
          className="w-16 h-16 place-self-center"
          src={item.image}
          width={400}
          height={400}
          alt="beeaadddd"
        />
      </div>
    </div>
  );
};

const OrderModal = ({
  setModalOpen,
  handleOrderSubmit,
  setTotal,
  status,
  setDeliveryMethod,
  total,
  deliveryMethod,
  setStatus,
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setModalOpen(false);
        }
      }}
    >
      <div className="flex flex-col items-center justify-center bg-background w-[50vw] min-h-[60vh] rounded-2xl border-4 border-primaryLight gap-3">
        <h1 className="text-2xl font-darumadrop text-primary">order info</h1>
        <input
          type="text"
          placeholder="Total"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          className="rounded-xl border-2 px-2 py-1"
        />
        <input
          type="text"
          placeholder="Delivery Method"
          value={deliveryMethod}
          onChange={(e) => setDeliveryMethod(e.target.value)}
          className="rounded-xl border-2 px-2 py-1"
        />
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border-2 px-2 py-1"
        />
        <p className="font-inclusiveSans text-textLight text-sm mx-16 my-1 text-center">
          note: this project is still a work in progress! orders aren't being
          taken at the moment.
        </p>
        <button
          onClick={() => handleOrderSubmit()}
          className="font-darumadrop bg-primary text-background text-2xl px-5 py-2 rounded-3xl hover:bg-secondary transition ease-in-out duration-200"
        >
          Order
        </button>
      </div>
    </div>
  );
};

const examplePaletteItems = [
  {
    dragId: "white-pearl",
    name: "🦋",
    colour: "white",
    shape: "circle",
    diameter: 10,
    stock: 100,
    image: "/bead-images/bead1.png",
  },
  {
    dragId: "metal-heart",
    name: "💖",
    colour: "other",
    shape: "heart",
    diameter: 8,
    stock: 100,
    image: "/bead-images/bead2.png",
  },
  {
    dragId: "blue-circle",
    name: "✨",
    colour: "blue",
    shape: "circle",
    diameter: 12,
    stock: 100,
    image: "/bead-images/bead3.png",
  },
  {
    dragId: "white-circle",
    name: "🌺",
    colour: "white",
    shape: "circle",
    diameter: 15,
    stock: 100,
    image: "/bead-images/bead4.png",
  },
  {
    dragId: "purple-circle",
    name: "❤️",
    colour: "purple",
    shape: "circle",
    diameter: 8,
    stock: 100,
    image: "/bead-images/bead6.png",
  },
  {
    dragId: "pink-circle",
    name: "⚪",
    colour: "pink",
    shape: "circle",
    diameter: 6,
    stock: 100,
    image: "/bead-images/bead8.png",
  },
  {
    dragId: "pink-butterfly",
    name: "⬛",
    colour: "pink",
    shape: "butterfly",
    diameter: 10,
    stock: 100,
    image: "/bead-images/bead9.png",
  },
  {
    dragId: "yellow-pearl",
    name: "⬛",
    colour: "yellow",
    shape: "circle",
    diameter: 10,
    stock: 100,
    image: "/bead-images/bead10.png",
  },
  {
    dragId: "clear-star",
    name: "⬛",
    colour: "other",
    shape: "star",
    diameter: 10,
    stock: 100,
    image: "/bead-images/bead11.png",
  },
  {
    dragId: "pink-star",
    name: "⬛",
    colour: "pink",
    shape: "star",
    diameter: 10,
    stock: 100,
    image: "/bead-images/bead12.png",
  },
  {
    dragId: "small-white-pearl",
    name: "⬛",
    colour: "white",
    shape: "circle",
    diameter: 10,
    stock: 100,
    image: "/bead-images/bead13.png",
  },
];

const JewelryMaker = () => {
  const [selectedBeads, setSelectedBeads] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [total, setTotal] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [status, setStatus] = useState("");

  const paletteItems = examplePaletteItems;

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

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
        dragId: `${item.dragId}-${uuidv4()}`,
        name: item.name,
        stock: item.stock,
        image: item.image,
        diameter: item.diameter,
        colour: item.colour,
        shape: item.shape,
      };
      return [newItem, ...prev];
    });
  };

  const handleOrderSubmit = async () => {
    try {
      const orderData = {
        date_ordered: Date.now(), // gets current time in ms
        total: total,
        delivery_method: deliveryMethod,
        status: status,
        customer_id: null,
        beads: null,
      };

      await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
      });
    } catch (error) {
      console.error("Error creating order", error);
    }
    setModalOpen(false);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col gap-4 justify-center items-center text-3xl">
        <div className="flex-wrap sm:flex-nowrap w-full h-[calc(90%-40px)] flex gap-8 justify-center items-center text-3xl">
          <div className="w-full h-full p-4 bg-backgroundDark rounded-3xl border-4 border-primaryLight justify-center items-center overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
          <div className="w-full h-full flex flex-col gap-4">
            <div className="flex flex-col items-center justify-center space-y-6">
              <h3 className="font-darumadrop text-primary text-4xl">
                Bead Tray
              </h3>
              <div id="filters" className="w-full flex justify-between">
                <div className="flex justify-around space-x-2">
                  <button className="font-inclusiveSans text-xl rounded-full px-3 py-1 border-2 border-textDark text-textDark hover:bg-primaryLight hover:border-primaryLight transition ease-in-out duration-200 active:bg-primary active:text-background active:border-primary">
                    shape
                  </button>
                  <button className="font-inclusiveSans text-xl rounded-full px-3 py-1 border-2 border-textDark text-textDark hover:bg-primaryLight hover:border-primaryLight transition ease-in-out duration-200 active:bg-primary active:text-background active:border-primary">
                    color
                  </button>
                  <button className="font-inclusiveSans text-xl rounded-full px-3 py-1 border-2 border-textDark text-textDark hover:bg-primaryLight hover:border-primaryLight transition ease-in-out duration-200 active:bg-primary active:text-background active:border-primary">
                    size
                  </button>
                </div>
                <button className="group text-xl ml-2 rounded-full px-2 border-2 border-textDark text-textDark hover:bg-primaryLight hover:border-primaryLight transition ease-in-out duration-200 active:bg-primary active:text-background active:border-primary">
                  <svg
                    className="group-active:text-background"
                    width="20"
                    height="19"
                    viewBox="0 0 20 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M15.5569 18.9951C15.3966 18.9957 15.2385 18.958 15.0959 18.8851L9.98497 16.2164L4.87405 18.8851C4.70808 18.9722 4.52097 19.011 4.33397 18.9973C4.14697 18.9835 3.96759 18.9178 3.81621 18.8074C3.66484 18.697 3.54755 18.5465 3.47768 18.3729C3.4078 18.1994 3.38814 18.0098 3.42094 17.8256L4.42308 12.1983L0.294259 8.20022C0.165441 8.072 0.0740596 7.91122 0.0299215 7.73513C-0.0142167 7.55904 -0.00944543 7.37428 0.0437232 7.20069C0.101807 7.02305 0.208652 6.86521 0.352133 6.74507C0.495613 6.62493 0.669984 6.54731 0.855458 6.52102L6.56767 5.69141L9.08304 0.563842C9.1651 0.394852 9.29323 0.252333 9.45274 0.152611C9.61226 0.0528901 9.79671 0 9.98497 0C10.1732 0 10.3577 0.0528901 10.5172 0.152611C10.6767 0.252333 10.8048 0.394852 10.8869 0.563842L13.4323 5.68141L19.1445 6.51102C19.33 6.53731 19.5044 6.61493 19.6479 6.73507C19.7913 6.85521 19.8982 7.01306 19.9563 7.1907C20.0094 7.36429 20.0142 7.54905 19.9701 7.72514C19.9259 7.90123 19.8346 8.06201 19.7057 8.19022L15.5769 12.1883L16.5791 17.8157C16.6148 18.003 16.5961 18.1967 16.5251 18.3738C16.454 18.551 16.3337 18.7041 16.1782 18.8152C15.9967 18.942 15.7782 19.0053 15.5569 18.9951Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pr-4 overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-primary/20 [&::-webkit-scrollbar-thumb]:rounded-full">
              {paletteItems.map((item) => (
                <button
                  key={item.dragId}
                  onClick={() => handleAddItem(item)}
                  className="bg-backgroundDark rounded-lg aspect-square hover:bg-background hover:scale-110 active:scale-125 transition ease-in-out duration-200"
                >
                  <Image
                    className="w-16 h-16 place-self-center"
                    src={item.image}
                    width={400}
                    height={400}
                    alt="beeaadddd"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full h-[32px] flex items-center justify-around rounded-lg">
          <div className="w-full flex justify-center">
            <button
              onClick={() => setModalOpen(true)}
              className="font-darumadrop bg-primary text-background text-2xl px-5 py-2 rounded-3xl hover:bg-secondary transition ease-in-out duration-200"
            >
              Order
            </button>
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
      {modalOpen && (
        <OrderModal
          setModalOpen={setModalOpen}
          handleOrderSubmit={handleOrderSubmit}
          setTotal={setTotal}
          setDeliveryMethod={setDeliveryMethod}
          setStatus={setStatus}
          status={status}
          total={total}
          deliveryMethod={deliveryMethod}
        />
      )}
    </>
  );
};

export default JewelryMaker;
