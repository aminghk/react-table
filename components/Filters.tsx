"use client"

import { useState } from "react"
import { Search } from "lucide-react"

interface FilterField {
  key: string
  label: string
}

interface FiltersProps {
  fields: FilterField[]
  onFilterChange: (key: string, value: string) => void
  onSearchChange: (value: string) => void
  searchTerm: string
}

export default function Filters({ fields, onFilterChange, onSearchChange, searchTerm }: FiltersProps) {
  const [showSearch, setShowSearch] = useState(false)
  const [filters, setFilters] = useState<Record<string, string>>({})

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(key, value)
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      {fields.map((field) => (
        <div key={field.key} className="relative">
          <input
            type="text"
            placeholder={field.label}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
            value={filters[field.key] || ""}
            onChange={(e) => handleFilterChange(field.key, e.target.value)}
          />
        </div>
      ))}

      <div className="flex items-center">
        <button
          className="p-2 rounded-md bg-blue text-black hover:bg-yellow transition-colors"
          onClick={() => setShowSearch(!showSearch)}
        >
          <Search size={20} />
        </button>

        {showSearch && (
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        )}
      </div>
    </div>
  )
}

