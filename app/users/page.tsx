"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchUsers, setSearchTerm, setFilter, resetFilters } from "@/redux/features/usersSlice"
import DataTable from "@/components/DataTable"
import TableControls from "@/components/TableControls"
import Pagination from "@/components/Pagination"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export default function UsersPage() {
  const dispatch = useAppDispatch()
  const { users, loading, error, currentPage, pageSize, total, searchTerm, filters } = useAppSelector(
    (state) => state.users,
  )

  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, limit: pageSize, ...filters }))
  }, [dispatch, currentPage, pageSize, filters])

  const columns = [
    { key: "firstName", label: "FIRST NAME" },
    { key: "lastName", label: "LAST NAME" },
    { key: "maidenName", label: "MAIDEN NAME" },
    { key: "age", label: "AGE" },
    { key: "gender", label: "GENDER" },
    { key: "email", label: "EMAIL" },
    { key: "username", label: "USERNAME" },
    { key: "bloodGroup", label: "BLOODGROUP" },
    { key: "eyeColor", label: "EYECOLOR" },
  ]

  const filterFields = [
    { key: "firstName", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "gender",
      label: "Gender",
    },
  ]

  const handleFilterChange = (key: string, value: string) => {
    if (value) {
      dispatch(resetFilters())
      dispatch(setFilter({ key, value }))
    } else {
      dispatch(setFilter({ key, value: "" }))
    }
  }

  const handleSearchChange = (value: string) => {
    dispatch(setSearchTerm(value))
  }

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link href="/" className="text-gray-600 hover:text-black">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="font-medium text-black border-b-2 border-yellow">Users</span>
      </nav>

      <div className="bg-white rounded-lg shadow-sm border">
        {/* Table Controls */}
        <TableControls
          pageSize={pageSize}
          filterFields={filterFields}
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
          searchTerm={searchTerm}
        />

        {/* Data Table */}
        <DataTable data={users} columns={columns} loading={loading} error={error} searchTerm={searchTerm} />

        {/* Pagination */}
        <div className="px-6 py-4 border-t">
          <Pagination currentPage={currentPage} pageSize={pageSize} total={total} />
        </div>
      </div>
    </div>
  )
}

