import DropdownArrow from "../../public/icons/dropdown-arrow.svg";

const types = [
  { name: "Keychain", available: true },
  { name: "Earrings", available: false },
  // { name: "Bracelet", available: false },
  // { name: "Necklace", available: false },
]

const JewelryTypes = () => {
  return (
    <>
      {/* Mobile View */}

      <button className="flex md:hidden items-center gap-2 h-fit bg-[#FDF8F3] px-3 py-2 rounded-xl border-[1.5px] border-textDark hover:border-primaryDark hover:text-primaryDark transition duration-75">
        <p>Keychain</p>
        <DropdownArrow className=""/>
      </button>

      {/* Desktop and Tablet View */}

      <div className="hidden md:flex gap-3">
        {types.map((type) => (
          type.available ? (
            <button key={type.name} className="cursor-default bg-[#FDF8F3] px-5 py-2 rounded-xl border-[1.5px] border-textDark hover:border-primaryDark hover:text-primaryDark transition duration-75">
              {type.name}
            </button>
          ) : (
            <div key={type.name} className="group flex-col relative">
              <button disabled className=" bg-backgroundDark px-5 py-2 rounded-xl border-[1.5px] border-textLight/40 text-textLight/40">
                {type.name}
                <div data-tooltip="tooltip" data-tooltip-placement="{bottom}" className="absolute left-1 -bottom-8 text-textDark/65 text-sm bg-backgroundDark p-1 rounded-md opacity-0 group-hover:opacity-100 transition ease-in-out duration-300 delay-500">
                  coming soon!
                </div>  
              </button>
            </div>
          )
        ))}
      </div>
    </>
  )

}

export default JewelryTypes;