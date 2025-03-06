import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  username: string
  birthDate: string
  age: number
  gender: string
  address: {
    city: string
    [key: string]: any
  }
  company: {
    name: string
    [key: string]: any
  }
  university: string
  [key: string]: any
}

interface UsersState {
  users: User[]
  loading: boolean
  error: string | null
  currentPage: number
  pageSize: number
  total: number
  searchTerm: string
  filters: Record<string, string>
}

interface FetchUsersParams {
  page: number
  limit: number
  [key: string]: any
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 5,
  total: 0,
  searchTerm: "",
  filters: {},
}

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (params: FetchUsersParams, { rejectWithValue }) => {
    try {
      // Calculate skip based on page and limit
      const skip = (params.page - 1) * params.limit

      // Remove page and limit from params to build query params
      const { page, limit, ...filters } = params

      // Build base URL and query params
      let url = "https://dummyjson.com/users"
      const queryParams = new URLSearchParams()
      queryParams.append("limit", limit.toString())
      queryParams.append("skip", skip.toString())

      // Check if we have any filters
      const hasFilters = Object.keys(filters).length > 0

      // Special handling for gender filter
      if (filters.gender) {
        url = `https://dummyjson.com/users/filter`
        queryParams.append("key", "gender")
        queryParams.append("value", filters.gender.toLowerCase())
      }
      // If we have other filters, use the search endpoint
      else if (hasFilters) {
        url = "https://dummyjson.com/users/search"

        // Get the first filter key and value
        const filterKey = Object.keys(filters)[0]
        const filterValue = filters[filterKey]

        if (filterValue) {
          // For search endpoint, use the 'q' parameter
          queryParams.append("q", filterValue)

          // Add key-specific parameters if needed
          if (filterKey === "firstName" || filterKey === "lastName") {
            queryParams.append("key", filterKey)
          }
        }
      }

      console.log(`Fetching from: ${url}?${queryParams.toString()}`)
      const response = await axios.get(`${url}?${queryParams.toString()}`)

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue("An unknown error occurred")
    }
  },
)

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload
      state.currentPage = 1 // Reset to first page when changing page size
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    setFilter: (state, action: PayloadAction<{ key: string; value: string }>) => {
      state.filters = {
        ...state.filters,
        [action.payload.key]: action.payload.value,
      }
      state.currentPage = 1 // Reset to first page when applying filters
    },
    resetFilters: (state) => {
      state.filters = {}
      state.currentPage = 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload.users
        state.total = action.payload.total
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setCurrentPage, setPageSize, setSearchTerm, setFilter, resetFilters } = usersSlice.actions

export default usersSlice.reducer

