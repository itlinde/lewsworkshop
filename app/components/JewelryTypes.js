const types = [
  { name: "Keychain", available: true, active: true },
  { name: "Earrings", available: false, active: false },
  // { name: "Bracelet", available: false, active: false },
  // { name: "Necklace", available: false, active: false },
]

const JewelryTypes = () => {
  return (
    <>
      {/* Desktop and Tablet View */}

      <div className="flex flex-col md:flex-row gap-3 w-56 md:w-fit">
        {types.map((type) => (
          type.available ? (
            <button key={type.name} className={`cursor-default ${type.active ? "bg-textDark text-background border-textDark" : "bg-[#FDF8F3] border-textDark hover:border-primaryDark hover:text-primaryDark"} w-full px-5 py-2 rounded-xl border-[1.5px] transition duration-75`}>
              {type.name}
            </button>
          ) : (
            <div key={type.name} className="group flex-col relative">
              <button disabled className=" bg-backgroundDark w-full px-5 py-2 rounded-xl border-[1.5px] border-textLight/40 text-textLight/40">
                {type.name}
                <div data-tooltip="tooltip" data-tooltip-placement="{bottom}" className="absolute inset-x-14 md:inset-x-0 -bottom-8 text-textDark/65 text-sm bg-backgroundDark p-1 rounded-md opacity-0 group-hover:opacity-100 transition ease-in-out duration-300 delay-500">
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