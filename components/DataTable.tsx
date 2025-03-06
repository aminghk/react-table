"use client"

import { useMemo } from "react"
import { get } from "lodash"

interface Column {
  key: string
  label: string
}

interface DataTableProps {
  data: any[]
  columns: Column[]
  loading: boolean
  error: string | null
  searchTerm: string
}

export default function DataTable({ data, columns, loading, error, searchTerm }: DataTableProps) {
  const filteredData = useMemo(() => {
    if (!searchTerm) return data

    return data.filter((item) => {
      return columns.some((column) => {
        const value = get(item, column.key)
        if (value === null || value === undefined) return false
        return String(value).toLowerCase().includes(searchTerm.toLowerCase())
      })
    })
  }, [data, searchTerm, columns])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>
  }

  if (!filteredData.length) {
    return <div className="text-center p-4 text-gray-500">No data found</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-[#E5F3F3]">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 tracking-wider whitespace-nowrap"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.map((row, rowIndex) => (
            <tr key={row.id || rowIndex} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={`${row.id}-${column.key}`} className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {get(row, column.key) || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

