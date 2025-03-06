import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
  [key: string]: any
}

interface ProductsState {
  products: Product[]
  loading: boolean
  error: string | null
  currentPage: number
  pageSize: number
  total: number
  searchTerm: string
  filters: Record<string, string>
  category: string
}

interface FetchProductsParams {
  page: number
  limit: number
  category?: string
  title?: string
  brand?: string
  [key: string]: any
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 5,
  total: 0,
  searchTerm: "",
  filters: {},
  category: "ALL",
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params: FetchProductsParams, { rejectWithValue }) => {
    try {
      // Calculate skip based on page and limit
      const skip = (params.page - 1) * params.limit

      // Log the full params received by the thunk
      console.log("Thunk received params:", params)

      // Build base URL and query params
      let url = "https://dummyjson.com/products"
      const queryParams = new URLSearchParams()
      queryParams.append("limit", params.limit.toString())
      queryParams.append("skip", skip.toString())

      // Handle specific filters
      if (params.category) {
        // Category filter takes precedence
        url = `https://dummyjson.com/products/category/${params.category}`
        console.log(`Using category endpoint: ${url}`)
      } else if (params.title) {
        // Title search
        url = "https://dummyjson.com/products/search"
        queryParams.append("q", params.title)
        console.log(`Using title search: ${url}`)
      } else if (params.brand) {
        // Brand search
        url = "https://dummyjson.com/products/search"
        queryParams.append("q", params.brand)
        console.log(`Using brand search: ${url}`)
      }

      const finalUrl = `${url}?${queryParams.toString()}`
      console.log(`Final API URL: ${finalUrl}`)

      const response = await axios.get(finalUrl)
      console.log("API response received")

      return response.data
    } catch (error) {
      console.error("API error:", error)
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue("An unknown error occurred")
    }
  },
)

const productsSlice = createSlice({
  name: "products",
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
        [action.payload.key]: action.payload.value,
      }
      state.currentPage = 1 // Reset to first page when applying filters
    },
    resetFilters: (state) => {
      state.filters = {}
      state.currentPage = 1
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
      state.currentPage = 1 // Reset to first page when changing category
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload.products
        state.total = action.payload.total
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setCurrentPage, setPageSize, setSearchTerm, setFilter, resetFilters, setCategory } =
  productsSlice.actions

export default productsSlice.reducer

