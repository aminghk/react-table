"use client"

import { useState, useEffect } from "react"
import { Search, ChevronDown } from "lucide-react"
import PageSizeSelector from "./PageSizeSelector"

interface FilterField {
  key: string
  label: string
  options?: string[]
}

interface TableControlsProps {
  pageSize: number
  filterFields: FilterField[]
  onFilterChange: (key: string, value: string) => void
  onSearchChange: (value: string) => void
  searchTerm: string
}

export default function TableControls({
  pageSize,
  filterFields,
  onFilterChange,
  onSearchChange,
  searchTerm,
}: TableControlsProps) {
  const [showSearch, setShowSearch] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [filterValues, setFilterValues] = useState<Record<string, string>>({})
  const [activeFilterBadges, setActiveFilterBadges] = useState<Record<string, boolean>>({})

  const handleFilterClick = (key: string) => {
    setActiveFilter(activeFilter === key ? null : key)
  }

  const handleFilterValueChange = (key: string, value: string) => {
    // Only update the current filter, don't touch others
    setFilterValues({
      ...filterValues,
      [key]: value,
    })
  }

  const handleFilterApply = (key: string) => {
    const value = filterValues[key] || ""

    // Update filter badges - only show badge for the current filter
    const newBadges: Record<string, boolean> = {}
    if (value) {
      newBadges[key] = true
    }
    setActiveFilterBadges(newBadges)

    // Clear ALL filter values, then set only the current one if it has a value
    const newFilterValues: Record<string, string> = {}
    if (value) {
      newFilterValues[key] = value
    }
    setFilterValues(newFilterValues)

    // Notify parent component
    onFilterChange(key, value)

    // Close dropdown
    setActiveFilter(null)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeFilter && !(event.target as Element).closest(".filter-dropdown")) {
        setActiveFilter(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeFilter])

  return (
    <div className="px-6 py-4 border-b flex items-center gap-6">
      {/* Page Size and Entries */}
      <div className="flex items-center gap-2">
        <PageSizeSelector />
        <span className="text-gray-500">Entries</span>
      </div>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-200" />

      {/* Search Toggle */}
      <button className="p-2 rounded-md hover:bg-gray-100" onClick={() => setShowSearch(!showSearch)}>
        <Search size={20} className="text-gray-500" />
      </button>

      {/* Search Input */}
      {showSearch && (
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue/50"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      )}

      {/* Column Filters */}
      <div className="flex items-center gap-4 ml-auto">
        {filterFields.map((field) => (
          <div key={field.key} className="relative filter-dropdown">
            <button
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
              onClick={() => handleFilterClick(field.key)}
            >
              <span>{field.label}</span>
              {activeFilterBadges[field.key] && (
                <span className="ml-1 px-1.5 py-0.5 bg-blue text-xs rounded-full">1</span>
              )}
              <ChevronDown size={14} className={activeFilter === field.key ? "transform rotate-180" : ""} />
            </button>

            {activeFilter === field.key && (
              <div className="absolute right-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-10 filter-dropdown">
                <div className="p-2">
                  {field.options ? (
                    <div className="space-y-1">
                      {field.options.map((option) => (
                        <button
                          key={option}
                          className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-100 ${
                            filterValues[field.key] === option ? "bg-blue/20" : ""
                          }`}
                          onClick={() => {
                            handleFilterValueChange(field.key, option)
                            handleFilterApply(field.key)
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder={`Filter by ${field.label.toLowerCase()}`}
                        className="w-full px-2 py-1 text-sm border rounded"
                        value={filterValues[field.key] || ""}
                        onChange={(e) => handleFilterValueChange(field.key, e.target.value)}
                        autoFocus
                      />
                      <button
                        className="w-full px-2 py-1 text-sm bg-blue text-white rounded hover:bg-blue/90"
                        onClick={() => handleFilterApply(field.key)}
                      >
                        Apply Filter
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

