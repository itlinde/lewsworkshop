import Image from "next/image";
import PlusIcon from "../../public/icons/plus-icon.svg";

const BeadBox = ({ onClick, imagePath, price, diameter }) => {
  const scaledSize = diameter * 6;

  return (
    <button onClick={onClick} className="group relative grid size-[118px] md:size-36 border-backgroundDark border-[1.5px] place-content-center rounded-2xl text-center">
        <Image
          className="object-contain group-hover:scale-110 transition ease-in-out duration-200"
          src={imagePath}
          style={{
            width: `${Math.min(scaledSize, 130)}px`,
            height: `${Math.min(scaledSize, 130)}px`,
          }}
          width={300}
          height={300}
          alt=""
        />
        <div className="opacity-0 group-hover:opacity-100 absolute top-0 bg-background/60 backdrop-blur-sm h-full w-full rounded-2xl grid place-items-center">
          {/* <p className="text-4xl text-textDark place-self-center">+</p> */}
          {/* <Image className="text-textDark scale-50 group-hover:scale-110 transition ease-in-out" src={PlusIcon} alt=""/>   */}
          <PlusIcon className="text-textDark scale-50 group-hover:scale-110 transition ease-in-out"/>
        </div>
        <p className="text-xs text-textLight absolute place-self-center bottom-0 py-1.5 px-3 opacity-100 group-hover:opacity-100">${(price / 100).toFixed(2)}</p>
    </button>
  );
};

export default BeadBox;

