type FilterType = "all" | "active" | "completed";

interface FilterButtonsProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ filter, setFilter }) => {
  return (
    <div className="flex justify-between mb-6">
      {["all", "active", "completed"].map((buttonFilter) => {
        const isActive = filter === buttonFilter;
        const baseClass = "px-4 py-2 rounded-full transition duration-200";
        const activeClass = "bg-gray-700 text-gray-300 hover:bg-gray-600";
        const inactiveClass = "bg-gray-300 text-gray-700 hover:bg-gray-400";

        return (
          <button
            key={buttonFilter}
            onClick={() => setFilter(buttonFilter as FilterType)}
            className={`${baseClass} ${isActive && activeClass} ${!isActive && inactiveClass}`}
          >
            {buttonFilter.charAt(0).toUpperCase() + buttonFilter.slice(1)}
          </button>
        );
      })}
    </div>
  );
};

export default FilterButtons;
