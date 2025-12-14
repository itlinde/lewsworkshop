import Image from "next/image";
import PlusIcon from "../../public/icons/plus-icon.svg";

const DIAMETER_TO_PX_SCALE = 6;
const MAX_BEAD_DISPLAY_SIZE_PX = 130;

const BeadBox = ({ onClick, imagePath, price, diameter, name }) => {
  const scaledSize = diameter * DIAMETER_TO_PX_SCALE;

  return (
    <button
      onClick={onClick}
      className="group relative grid size-28 md:size-36 border-backgroundDark border-[1.5px] place-content-center rounded-xl text-center"
    >
      <Image
        className="object-contain group-hover:scale-110 transition ease-in-out duration-200"
        src={imagePath}
        style={{
          width: `${Math.min(scaledSize, MAX_BEAD_DISPLAY_SIZE_PX)}px`,
          height: `${Math.min(scaledSize, MAX_BEAD_DISPLAY_SIZE_PX)}px`,
        }}
        width={300}
        height={300}
        alt={name || "Decorative bead"}
      />
      <div className="opacity-0 group-hover:opacity-100 absolute top-0 bg-background/60 backdrop-blur-sm h-full w-full rounded-2xl grid place-items-center">
        <PlusIcon className="text-textDark scale-50 group-hover:scale-110 transition ease-in-out" />
      </div>
      <p className="text-xs text-textLight absolute place-self-center bottom-0 py-1.5 px-3 opacity-100 group-hover:opacity-100">
        ${(price / 100).toFixed(2)}
      </p>
    </button>
  );
};

export default BeadBox;
