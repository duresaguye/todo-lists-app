import type React from "react"

type FilterType = "all" | "active" | "completed"

interface FilterButtonsProps {
  filter: FilterType
  setFilter: (filter: FilterType) => void
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ filter, setFilter }) => {
  return (
    <div className="flex justify-between mb-6">
      {["all", "active", "completed"].map((buttonFilter) => (
        <button
          key={buttonFilter}
          onClick={() => setFilter(buttonFilter as FilterType)}
          className={`px-4 py-2 rounded-full transition duration-200 ${
            filter === buttonFilter ?"bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {buttonFilter.charAt(0).toUpperCase() + buttonFilter.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default FilterButtons

