import { COLORS, SHAPES, SIZES } from "../../lib/constants";

const FilterBar = ({ filters, setFilters }) => {
  return (
    <div className="flex gap-2">
      <select
        id="colour"
        value={filters.colour}
        className="bg-background border-textDark border-[1.5px] w-fit rounded-lg px-1.5 py-1 hover:text-primaryDark hover:border-primaryDark transition ease-in-out duration-100 appearance-none"
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, colour: e.target.value }))
        }
      >
        <option value="">All Colours</option>
        {COLORS.map((color) => (
          <option key={color.value} value={color.value}>
            {color.label}
          </option>
        ))}
      </select>
      <select
        id="size"
        value={filters.size}
        className="bg-background border-textDark border-[1.5px] w-fit rounded-lg px-1.5 py-1 hover:text-primaryDark hover:border-primaryDark transition ease-in-out duration-100 appearance-none"
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, size: e.target.value || "" }))
        }
      >
        <option value="">All Sizes</option>
        {SIZES.map((size) => (
          <option key={size.value} value={size.value}>
            {size.label}
          </option>
        ))}
      </select>
      <select
        id="shape"
        value={filters.shape}
        className="bg-background border-textDark border-[1.5px] rounded-lg px-1.5 py-1 hover:text-primaryDark hover:border-primaryDark transition ease-in-out duration-100 appearance-none"
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, shape: e.target.value || "" }))
        }
      >
        <option value="">All Shapes</option>
        {SHAPES.map((shape) => (
          <option key={shape.value} value={shape.value}>
            {shape.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
