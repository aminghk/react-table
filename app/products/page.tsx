"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchProducts, setSearchTerm, setCategory } from "@/redux/features/productsSlice"
import DataTable from "@/components/DataTable"
import TableControls from "@/components/TableControls"
import Pagination from "@/components/Pagination"
import Tabs from "@/components/Tabs"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export default function ProductsPage() {
  const dispatch = useAppDispatch()
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

  const { products, loading, error, currentPage, pageSize, total, searchTerm, filters, category } = useAppSelector(
    (state) => state.products,
  )


  useEffect(() => {
    const requestParams: { page: number; limit: number; category?: string; brand?: string; title?: string } = {
      page: currentPage,
      limit: pageSize,
    }

    if (activeFilters.category) {
      requestParams.category = activeFilters.category
    } else if (activeFilters.brand) {
      requestParams.brand = activeFilters.brand
    } else if (activeFilters.title) {
      requestParams.title = activeFilters.title
    }

    if (category !== "ALL" && !activeFilters.category) {
      requestParams.category = category
    }

    dispatch(fetchProducts(requestParams))
  }, [dispatch, currentPage, pageSize, activeFilters, category])

  const columns = [
    { key: "title", label: "TITLE" },
    { key: "description", label: "DESCRIPTION" },
    { key: "price", label: "PRICE" },
    { key: "discountPercentage", label: "DISCOUNT" },
    { key: "rating", label: "RATING" },
    { key: "stock", label: "STOCK" },
    { key: "brand", label: "BRAND" },
    { key: "category", label: "CATEGORY" },
  ]

  const filterFields = [
    { key: "title", label: "Title" },
    { key: "brand", label: "Brand" },
    { key: "category", label: "Category" },
  ]

  const tabs = [
    { id: "ALL", label: "ALL" },
    { id: "laptops", label: "Laptops" },
  ]

  const handleFilterChange = (key: string, value: string) => {

    if (value) {
      // Automatically switch to "ALL" tab when applying a category filter
      if (key === "category") {
        dispatch(setCategory("ALL"))
      }

      // Update local filter state - ONLY keep the current filter
      setActiveFilters({ [key]: value })
    } else {
      // If value is empty, clear all filters
      setActiveFilters({})
    }
  }

  const handleSearchChange = (value: string) => {
    dispatch(setSearchTerm(value))
  }

  const handleTabChange = (tabId: string) => {
    // Clear all filters when changing tabs
    setActiveFilters({})
    dispatch(setCategory(tabId))
  }

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link href="/" className="text-gray-600 hover:text-black">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="font-medium text-black border-b-2 border-yellow">Products</span>
      </nav>

      <div className="bg-white rounded-lg shadow-sm border">
        {/* Tabs */}
        <div className="px-6 pt-4">
          <Tabs tabs={tabs} activeTab={category} onTabChange={handleTabChange} />
        </div>

        {/* Table Controls */}
        <TableControls
          pageSize={pageSize}
          filterFields={filterFields}
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
          searchTerm={searchTerm}
        />

        {/* Data Table */}
        <DataTable data={products} columns={columns} loading={loading} error={error} searchTerm={searchTerm} />

        {/* Pagination */}
        <div className="px-6 py-4 border-t">
          <Pagination currentPage={currentPage} pageSize={pageSize} total={total} />
        </div>
      </div>
    </div>
  )
}

