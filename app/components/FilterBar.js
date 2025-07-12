const FilterBar = ({
  filters,
  setFilters,
}) => {
  return(
    <div className="flex gap-2">
      <select 
        id="colour"
        value={filters.colour}
        className="bg-background border-textDark border-[1.5px] rounded-2xl px-1 py-1 hover:text-primaryDark hover:border-primaryDark transition ease-in-out duration-100"
        onChange={(e) => setFilters((prev) => ({ ...prev, colour: e.target.value}))}
      >
        <option value="">All Colours</option>
        <option value="red">Red</option>
        <option value="orange">Orange</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="purple">Purple</option>
        <option value="pink">Pink</option>
        <option value="white">White</option>
        <option value="grey">Grey</option>
        <option value="black">Black</option>
        <option value="clear">Clear</option>
        <option value="pearl">Pearl</option>
        <option value="mixed">Mixed</option>
      </select>
      {/* <select
        id="size"
        value={filters.size}
        className="bg-background border-textDark border-[1.5px] rounded-2xl px-1 py-1 hover:text-primaryDark hover:border-primaryDark transition ease-in-out duration-100"
        onChange={(e) => setFilters((prev) => ({ ...prev, size: e.target.value || "" }))}
      >
        <option value="">Size</option>
        <option value="1">1 mm</option>
        <option value="2">2 mm</option>
        <option value="3">3 mm</option>
        <option value="4">4 mm</option>
        <option value="5">5 mm</option>
        <option value="6">6 mm</option>
        <option value="7">7 mm</option>
        <option value="8">8 mm</option>
        <option value="9">9 mm</option>
        <option value="10">10+ mm</option>
      </select> */}
      <select 
        id="shape"
        value={filters.shape}
        className="bg-background border-textDark border-[1.5px] rounded-2xl px-1 py-1 hover:text-primaryDark hover:border-primaryDark transition ease-in-out duration-100"
        onChange={(e) => setFilters((prev) => ({ ...prev, shape: e.target.value || "" }))}
      >
        <option value="">All Shapes</option>
        <option value="circle">Circle</option>
        <option value="oval">Oval</option>
        <option value="heart">Heart</option>
        <option value="butterfly">Butterfly</option>
        <option value="star">Star</option>
        <option value="flower">Flower</option>
        <option value="cube">Cube</option>
        <option value="cube">Teardrop</option>
        <option value="other">Other</option>
      </select>
    </div>
  )
};

export default FilterBar;