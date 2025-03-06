"use client"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setPageSize as setUsersPageSize } from "@/redux/features/usersSlice"
import { setPageSize as setProductsPageSize } from "@/redux/features/productsSlice"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"

export default function PageSizeSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()
  const pathname = usePathname()

  const isUsersPage = pathname === "/users"
  const pageSize = useAppSelector((state) => (isUsersPage ? state.users.pageSize : state.products.pageSize))

  const pageSizeOptions = [5, 10, 20, 50]

  const handlePageSizeChange = (size: number) => {
    if (isUsersPage) {
      dispatch(setUsersPageSize(size))
    } else {
      dispatch(setProductsPageSize(size))
    }
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="font-medium text-black">{pageSize}</span>
        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md border py-1 z-10 min-w-[80px] overflow-hidden">
          <div className="max-h-[200px] overflow-y-auto" role="listbox">
            {pageSizeOptions.map((size) => (
              <button
                key={size}
                role="option"
                aria-selected={pageSize === size}
                className={`block w-full px-4 py-2 text-left text-sm hover:bg-blue/10 transition-colors ${
                  pageSize === size ? "bg-blue/20 text-black font-medium" : "text-gray-600"
                }`}
                onClick={() => handlePageSizeChange(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

