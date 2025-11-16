import TrashIcon from "../../public/icons/trash-icon.svg";
import LengthIcon from "../../public/icons/length-icon.svg";

const BeadMenu = ({ diameter, price, onMenuClick }) => {
  return (
    <div className="z-10 absolute -right-24 top-1/2 -translate-y-1/2 space-y-1.5">
      <div className="cursor-default grid grid-cols-3 auto-rows-auto gap-2 p-2.5 bg-backgroundDark/60 rounded-xl">
        <div className="place-items-center">
          <p className="text-sm">$</p>
          <LengthIcon />
        </div>
        <div className="items-center col-span-2">
          <p className="text-sm">{(price / 100).toFixed(2) ?? '0.00'}</p>
          <p className="text-xs">{diameter ?? '0'} mm</p>
        </div>
      </div>
      <div>
        <button className={`group size-8 grid place-items-center rounded-lg active:scale-105
            bg-failRed/25 border-[1.5px] border-failRed hover:bg-failRed/60 active:bg-failRed
            transition-all duration-100`}
            onClick={onMenuClick}>
          <TrashIcon className="size-4 text-failRed group-hover:text-textDark group-active:scale-105 transition-all duration-100" />
        </button>
      </div>
    </div>
  )
};

export default BeadMenu;
