"use client"

import { useAppDispatch } from "@/redux/hooks"
import { setCurrentPage as setUsersCurrentPage } from "@/redux/features/usersSlice"
import { setCurrentPage as setProductsCurrentPage } from "@/redux/features/productsSlice"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  pageSize: number
  total: number
}

export default function Pagination({ currentPage, pageSize, total }: PaginationProps) {
  const dispatch = useAppDispatch()
  const pathname = usePathname()

  const isUsersPage = pathname === "/users"
  const totalPages = Math.ceil(total / pageSize)

  const handlePageChange = (page: number) => {
    if (isUsersPage) {
      dispatch(setUsersCurrentPage(page))
    } else {
      dispatch(setProductsCurrentPage(page))
    }
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center gap-1">
      <button
        className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={16} />
      </button>

      {generatePaginationItems(currentPage, totalPages).map((item, index) => (
        <button
          key={index}
          className={`min-w-[32px] h-8 flex items-center justify-center rounded ${
            item === currentPage
              ? "bg-gray-100 text-gray-900 font-medium"
              : item === "..."
                ? "text-gray-400 cursor-default"
                : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => {
            if (item !== "...") {
              handlePageChange(item as number)
            }
          }}
          disabled={item === "..."}
        >
          {item}
        </button>
      ))}

      <button
        className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}

function generatePaginationItems(currentPage: number, totalPages: number) {
  const items: (number | string)[] = []

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      items.push(i)
    }
    return items
  }

  // Always show first page
  items.push(1)

  // Calculate start and end of pagination window
  let startPage = Math.max(2, currentPage - 1)
  let endPage = Math.min(totalPages - 1, currentPage + 1)

  // Adjust window to always show 3 pages
  if (currentPage <= 3) {
    endPage = 4
  } else if (currentPage >= totalPages - 2) {
    startPage = totalPages - 3
  }

  // Add ellipsis if needed
  if (startPage > 2) {
    items.push("...")
  }

  // Add pages in the window
  for (let i = startPage; i <= endPage; i++) {
    items.push(i)
  }

  // Add ellipsis if needed
  if (endPage < totalPages - 1) {
    items.push("...")
  }

  // Always show last page
  items.push(totalPages)

  return items
}

