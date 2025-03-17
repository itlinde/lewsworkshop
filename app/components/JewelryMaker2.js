"use client";

import Image from 'next/image';
import dotGrid from "../../public/dot-grid.svg";
import { useEffect, useState } from "react";
import BeadBox from "./BeadBox";

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
// const SortableBead = ({ bead }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: item.dragId });

//   const style = {
//     transform: CSS.Translate.toString(transform),
//     transition,
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="w-full flex justify-center items-center"
//     >
//       <div className="flex justify-center items-center mb-2 rounded cursor-pointer aspect-square">
//         <Image
//           className="w-16 h-16 place-self-center"
//           src={item.image}
//           width={400}
//           height={400}
//           alt="beeaadddd"
//         />
//       </div>
//     </div>
//   );
// }

const JewelryMaker2 = () => {
  const [beads, setBeads] = useState([]);
  // const [selectedBeads, setSelectedBeads] = useState([]);

  // fetch beads from db & put into an array
  useEffect(() => {
    fetch("/api/beads")
      .then((res) => res.json())
      .then((beads) => setBeads(beads));
  }, []);

  // const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  // const handleAddBead = (bead) => {
  //   setSelectedBeads((prev) => {
  //     const newBead = {
  //       dragId: `${bead.id}-${uuidv4()}`,
  //       name: bead.name,
  //       stock: bead.stock,
  //       image: bead.image,
  //       diameter: bead.diameter,
  //       colour: bead.colour,
  //       shape: bead.shape,
  //     };
  //     return [newBead, ...prev];
  //   });
  // };

  return(
    <div className="flex w-screen font-inclusiveSans text-textDark">
      {/* Side bar */}
      <section className="bg-background h-dvh shrink-0 p-6">
        <div className="flex justify-between items-center mb-8 text-primary">
          <div className="flex items-center gap-3">
            <svg width="42" height="43" viewBox="0 0 42 43" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path stroke="currentColor" d="M27.3232 10.8221C30.8499 10.4302 33.8725 8.25134 36.9797 11.3586C39.7899 14.1688 40.4664 18.7091 39.0063 22.5052C38.2821 24.3882 35.4499 25.0565 33.7907 25.575C32.1533 26.0866 30.5666 25.4225 32.8071 26.9161C35.5907 28.7718 37.1673 30.4901 38.5593 33.622C38.9948 34.602 40.4356 37.5306 39.1256 38.3012C35.3881 40.4997 31.5358 42.3945 27.8597 38.7185C26.2444 37.1032 25.175 35.3547 24.6707 33.0855C24.4341 32.0206 23.8461 29.928 22.495 31.2079C19.6662 33.8879 16.1477 38.7185 11.8849 38.7185C7.4867 38.7185 6.40097 34.7391 6.40097 30.9695C6.40097 29.1544 7.50497 28.4067 8.9641 27.4526C9.4135 27.1588 12.2149 26.4311 11.6464 26.3499C6.44159 25.6063 3.25495 23.0861 2.13902 18.0644C0.784857 11.9707 9.67249 10.4937 13.6433 12.6997C14.9753 13.4397 11.6008 10.7566 11.2292 10.1664C10.4784 8.97395 10.1562 6.60852 10.1562 5.18917C10.1562 1.68236 15.9044 2.23859 18.2331 2.23859C21.2476 2.23859 23.3576 2.39644 24.9091 5.18917C25.8381 6.86137 27.3232 10.5418 27.3232 12.4315" strokeWidth="3" strokeLinecap="round"/>
              <path stroke="currentColor" d="M21.9586 21.2764C19.8983 21.2764 20.0795 22.8858 22.2268 22.8858C23.2288 22.8858 23.0797 22.0958 23.0315 21.2764C22.9809 20.4155 21.4983 20.7399 20.8857 20.7399" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <h1 className="font-darumadrop text-primary text-3xl">Lew's Workshop</h1>
          </div>
          {/* <p>LEWS WORKSHOP</p> */}
          <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 0.979187H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M1 8.89587H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M1 16.0209H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="flex items-center justify-between text-sm mb-4 text-textDark">
          <div className="flex gap-2">
            <p className="border-textDark border-[1.5px] rounded-2xl px-3 py-1 hover:text-primaryDark hover:border-primaryDark transition ease-in-out duration-100">Color</p>
            <p className="border-textDark border-[1.5px] rounded-2xl px-3 py-1 hover:text-primaryDark hover:border-primaryDark transition ease-in-out duration-100">Size</p>
            <p className="border-textDark border-[1.5px] rounded-2xl px-3 py-1 hover:text-primaryDark hover:border-primaryDark transition ease-in-out duration-100">Shape</p>
          </div>
          <div className="group flex gap-2 items-center text-textDark">
            <p className="underline group-hover:no-underline">Recommended</p>
            <svg className="" width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="#535353" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {beads.map((bead) => (
            <BeadBox 
              key={bead.id}
              id={bead.id}
              imagePath={bead.image_path}
              price={bead.price}
              diameter={bead.diameter_mm}
            />
          ))}
        </div>
      </section>

      {/* Main Canvas */}
      <section className="relative border-[1.5px] border-backgroundDark bg-backgroundDark/15 grow flex flex-col h-screen p-6">
        <Image className="-z-10 absolute top-0 left-0 object-none object-left-top max-h-full max-w-full" priority src={dotGrid} alt="" aria-hidden="true"/>
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <p className="bg-[#FDF8F3] px-5 py-2 rounded-2xl border-[1.5px] border-textDark hover:border-primaryDark hover:text-primaryDark transition duration-75">Keychain</p>
            <p className="cursor-not-allowed bg-backgroundDark px-5 py-2 rounded-2xl border-[1.5px] border-textLight/40 text-textLight/40">Earrings</p>
            <p className="cursor-not-allowed bg-backgroundDark px-5 py-2 rounded-2xl border-[1.5px] border-textLight/40 text-textLight/40">Bracelet</p>
            <p className="cursor-not-allowed bg-backgroundDark px-5 py-2 rounded-2xl border-[1.5px] border-textLight/40 text-textLight/40">Necklace</p>
          </div>
          <p className="bg-secondary px-5 py-4 rounded-2xl hover:bg-secondaryLight transition ease-in-out duration-75">Order <span className="font-sans">→</span></p>
        </div>
        <div className="relative grow">
          <div>
            {/* DRAG AND DROP AREA */}
          </div>
          <div className="absolute top-0 left-0 flex gap-3 p-3 items-center bg-backgroundDark/60 text-sm rounded-2xl">
            <p>(BEAD)</p>
            <div className="justify-items-end">
              <div className="">
                <p>$0.75</p>
                <p>4 mm</p>
              </div>
              <p className="text-textLight/40">#11520</p>
            </div>
          </div>
          <div className="absolute bottom-0 w-full flex items-end justify-between">
            <div>
              <p className="mb-2 text-textLight">Total: $13.55</p>
              <div className="bg-backgroundDark/40 px-4 py-2 gap-3 inline-flex items-baseline rounded-2xl">
                <p className="text-3xl">50.3 mm</p>
                <p className="text-sm text-textLight">0.405 in</p>
              </div>
            </div>
            <div className="bg-backgroundDark/60 flex gap-3 p-2 h-fit items-center rounded-2xl hover:bg-background transition ease-in-out duration-75">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.75 8.5L1 4.75L4.75 1" stroke="#424242" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 4.75H8.875C9.4167 4.75 9.9531 4.8567 10.4536 5.064C10.954 5.2713 11.4088 5.57514 11.7918 5.95818C12.1749 6.34123 12.4787 6.79596 12.686 7.29643C12.8933 7.7969 13 8.3333 13 8.875C13 9.4167 12.8933 9.9531 12.686 10.4536C12.4787 10.954 12.1749 11.4088 11.7918 11.7918C11.4088 12.1749 10.954 12.4787 10.4536 12.686C9.9531 12.8933 9.4167 13 8.875 13H6.25" stroke="#424242" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.25 8.5L13 4.75L9.25 1" stroke="#424242" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 4.75H5.125C4.5833 4.75 4.0469 4.8567 3.54643 5.064C3.04596 5.2713 2.59123 5.57514 2.20818 5.95818C1.82514 6.34123 1.5213 6.79596 1.314 7.29643C1.1067 7.7969 1 8.3333 1 8.875C1 9.4167 1.1067 9.9531 1.314 10.4536C1.5213 10.954 1.82514 11.4088 2.20818 11.7918C2.59123 12.1749 3.04596 12.4787 3.54643 12.686C4.0469 12.8933 4.5833 13 5.125 13H7.75" stroke="#424242" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M1.29118 0.552998C0.995804 0.262608 0.516906 0.262608 0.221531 0.552998C-0.0738438 0.843388 -0.0738438 1.3142 0.221531 1.60459L4.69257 6.00018L0.221783 10.3955C-0.073592 10.6859 -0.0735923 11.1567 0.221783 11.4471C0.517158 11.7375 0.996056 11.7375 1.29143 11.4471L5.76222 7.05177L10.0481 11.2653C10.3435 11.5557 10.8224 11.5557 11.1178 11.2653C11.4131 10.9749 11.4131 10.5041 11.1178 10.2137L6.83187 6.00018L11.118 1.78637C11.4134 1.49598 11.4134 1.02517 11.118 0.734776C10.8226 0.444386 10.3437 0.444386 10.0484 0.734776L5.76222 4.94858L1.29118 0.552998Z" fill="#424242"/>
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JewelryMaker2;

