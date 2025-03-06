# React Data Tables

A modern, responsive data tables application built with React, Next.js, TypeScript, and Redux Toolkit.

## Author

**Emin Aryan**

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Component Breakdown](#component-breakdown)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Styling](#styling)

## Overview

React Data Tables is a comprehensive data management application designed to display and filter user and product data from external APIs. It showcases modern React development practices with a focus on reusable components, efficient state management, and responsive design.

The application features two main data pages:
1. **Users** - Displays and filters user data
2. **Products** - Displays and filters product data with category tabs

## Features

- **Dynamic Data Tables** with sorting and client-side filtering
- **Server-side Filtering** with API integration
- **Pagination** with customizable page sizes
- **Responsive Design** optimized for all device sizes
- **Category Tabs** for product filtering
- **Search Functionality** with real-time filtering
- **Advanced Filters** with dropdown and text input options
- **Custom Styling** with Tailwind CSS
- **Type Safety** with TypeScript
- **State Management** with Redux Toolkit
- **API Integration** with Axios

## Technology Stack

- **Frontend Framework**: Next.js
- **UI Library**: React
- **Type System**: TypeScript
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **CSS Framework**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: Next.js App Router
- **Utility Library**: Lodash

## Project Structure
├── app/                     # Next.js application routes
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Home page
│   ├── users/               # Users page route
│   └── products/            # Products page route
├── components/              # Reusable UI components
│   ├── DataTable.tsx        # Main data table component
│   ├── Filters.tsx          # Filter input components
│   ├── PageSizeSelector.tsx # Page size dropdown
│   ├── Pagination.tsx       # Pagination controls
│   ├── TableControls.tsx    # Table header controls
│   └── Tabs.tsx             # Tab navigation component
├── redux/                   # Redux state management
│   ├── features/            # Redux slices and reducers
│   │   ├── usersSlice.ts    # Users state management
│   │   └── productsSlice.ts # Products state management
│   ├── hooks.ts             # Redux custom hooks
│   ├── provider.tsx         # Redux provider component
│   └── store.ts             # Redux store configuration
├── public/                  # Static assets
│   └── fonts/               # Custom font files
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies


## Component Breakdown

### Pages

#### `app/page.tsx`
The home page with navigation links to the Users and Products pages.

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-black">Data Tables App</h1>
      <div className="flex gap-4">
        <Link
          href="/users"
          className="px-6 py-3 bg-blue text-black font-semibold rounded-md hover:bg-yellow transition-colors"
        >
          Users Page
        </Link>
        <Link
          href="/products"
          className="px-6 py-3 bg-blue text-black font-semibold rounded-md hover:bg-yellow transition-colors"
        >
          Products Page
        </Link>
      </div>
    </main>
  )
}



## Component Breakdown

### Pages

#### `app/page.tsx`
The home page with navigation links to the Users and Products pages.

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-black">Data Tables App</h1>
      <div className="flex gap-4">
        <Link
          href="/users"
          className="px-6 py-3 bg-blue text-black font-semibold rounded-md hover:bg-yellow transition-colors"
        >
          Users Page
        </Link>
        <Link
          href="/products"
          className="px-6 py-3 bg-blue text-black font-semibold rounded-md hover:bg-yellow transition-colors"
        >
          Products Page
        </Link>
      </div>
    </main>
  )
}
```

#### `app/users/page.tsx`

The Users data table page that displays user data with filtering and pagination. It uses the Redux store to manage state and fetch data from the API.

Key features:

- Fetches user data from the API using Redux thunks
- Implements filtering by name, email, and gender
- Provides pagination and page size selection
- Includes breadcrumb navigation


#### `app/products/page.tsx`

The Products data table page that displays product data with filtering, tabs, and pagination. It includes special features like category tabs and brand filtering.

Key features:

- Fetches product data from the API using Redux thunks
- Implements filtering by title, brand, and category
- Provides category tabs for quick filtering
- Includes pagination and page size selection
- Ensures only one filter can be active at a time


### Components

#### `DataTable.tsx`

The core table component that renders data in rows and columns.

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

  // Rendering logic...
}


## Component Breakdown

### Pages

#### `app/page.tsx`
The home page with navigation links to the Users and Products pages.

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-black">Data Tables App</h1>
      <div className="flex gap-4">
        <Link
          href="/users"
          className="px-6 py-3 bg-blue text-black font-semibold rounded-md hover:bg-yellow transition-colors"
        >
          Users Page
        </Link>
        <Link
          href="/products"
          className="px-6 py-3 bg-blue text-black font-semibold rounded-md hover:bg-yellow transition-colors"
        >
          Products Page
        </Link>
      </div>
    </main>
  )
}
```

#### `app/users/page.tsx`

The Users data table page that displays user data with filtering and pagination. It uses the Redux store to manage state and fetch data from the API.

Key features:

- Fetches user data from the API using Redux thunks
- Implements filtering by name, email, and gender
- Provides pagination and page size selection
- Includes breadcrumb navigation


#### `app/products/page.tsx`

The Products data table page that displays product data with filtering, tabs, and pagination. It includes special features like category tabs and brand filtering.

Key features:

- Fetches product data from the API using Redux thunks
- Implements filtering by title, brand, and category
- Provides category tabs for quick filtering
- Includes pagination and page size selection
- Ensures only one filter can be active at a time


### Components

#### `DataTable.tsx`

The core table component that renders data in rows and columns.

```typescriptreact
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

  // Rendering logic...
}
```

Features:

- Dynamic column rendering based on provided configuration
- Loading and error states
- Client-side filtering with lodash
- Responsive design with horizontal scrolling


#### `TableControls.tsx`

Controls that appear at the top of each data table.

export default function TableControls({
  pageSize,
  filterFields,
  onFilterChange,
  onSearchChange,
  searchTerm,
}: TableControlsProps) {
  // State and handlers...

  return (
    <div className="px-6 py-4 border-b flex items-center gap-6">
      {/* Page Size and Entries */}
      {/* Search Toggle */}
      {/* Column Filters */}
    </div>
  )
}


Features:

- Page size selector
- Search input toggle
- Column-specific filters with dropdown and text input options
- Filter reset functionality
- Ensures only one filter can be active at a time


#### `Pagination.tsx`

A pagination component that handles navigation between pages of data.
export default function Pagination({ currentPage, pageSize, total }: PaginationProps) {
  const dispatch = useAppDispatch()
  const pathname = usePathname()

  const isUsersPage = pathname === "/users"
  const totalPages = Math.ceil(total / pageSize)

  // Pagination logic...
}
Features:

- Dynamic page number generation
- First/last page links
- Previous/next buttons
- Handling for large number of pages with ellipsis


#### `Tabs.tsx`

A tab navigation component used in the Products page for category filtering.

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
              activeTab === tab.id
                ? "border-yellow text-black"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}

Features:

- Active tab highlighting
- Tab click handlers
- Styled with a border-bottom indicator


#### `PageSizeSelector.tsx`

A dropdown component to select the number of items to display per page.

export default function PageSizeSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()
  const pathname = usePathname()

  const isUsersPage = pathname === "/users"
  const pageSize = useAppSelector((state) => (isUsersPage ? state.users.pageSize : state.products.pageSize))

  // Dropdown logic...
}

Features:

- Custom styling with animation
- Options for 5, 10, 20, and 50 items per page
- Integration with Redux state


### Redux State Management

#### `usersSlice.ts`

Redux slice for managing user data state.

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (params: FetchUsersParams, { rejectWithValue }) => {
    try {
      // API request logic...
    } catch (error) {
      // Error handling...
    }
  }
)

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Actions...
  },
  extraReducers: (builder) => {
    // Async thunk handling...
  },
})

Features:

- Async thunk for fetching users from API
- Actions for pagination, search, and filtering
- Reducers for updating state


#### `productsSlice.ts`

Redux slice for managing product data state.

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params: FetchProductsParams, { rejectWithValue }) => {
    try {
      // API request logic...
    } catch (error) {
      // Error handling...
    }
  }
)

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Actions...
  },
  extraReducers: (builder) => {
    // Async thunk handling...
  },
})

Features:

- Async thunk for fetching products from API
- Actions for pagination, search, filtering, and category selection
- Reducers for updating state



## Component Breakdown

### Pages

#### `app/page.tsx`
The home page with navigation links to the Users and Products pages.

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-black">Data Tables App</h1>
      <div className="flex gap-4">
        <Link
          href="/users"
          className="px-6 py-3 bg-blue text-black font-semibold rounded-md hover:bg-yellow transition-colors"
        >
          Users Page
        </Link>
        <Link
          href="/products"
          className="px-6 py-3 bg-blue text-black font-semibold rounded-md hover:bg-yellow transition-colors"
        >
          Products Page
        </Link>
      </div>
    </main>
  )
}
```

#### `app/users/page.tsx`

The Users data table page that displays user data with filtering and pagination. It uses the Redux store to manage state and fetch data from the API.

Key features:

- Fetches user data from the API using Redux thunks
- Implements filtering by name, email, and gender
- Provides pagination and page size selection
- Includes breadcrumb navigation


#### `app/products/page.tsx`

The Products data table page that displays product data with filtering, tabs, and pagination. It includes special features like category tabs and brand filtering.

Key features:

- Fetches product data from the API using Redux thunks
- Implements filtering by title, brand, and category
- Provides category tabs for quick filtering
- Includes pagination and page size selection
- Ensures only one filter can be active at a time


### Components

#### `DataTable.tsx`

The core table component that renders data in rows and columns.

```typescriptreact
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

  // Rendering logic...
}
```

Features:

- Dynamic column rendering based on provided configuration
- Loading and error states
- Client-side filtering with lodash
- Responsive design with horizontal scrolling


#### `TableControls.tsx`

Controls that appear at the top of each data table.

```typescriptreact
export default function TableControls({
  pageSize,
  filterFields,
  onFilterChange,
  onSearchChange,
  searchTerm,
}: TableControlsProps) {
  // State and handlers...

  return (
    <div className="px-6 py-4 border-b flex items-center gap-6">
      {/* Page Size and Entries */}
      {/* Search Toggle */}
      {/* Column Filters */}
    </div>
  )
}
```

Features:

- Page size selector
- Search input toggle
- Column-specific filters with dropdown and text input options
- Filter reset functionality
- Ensures only one filter can be active at a time


#### `Pagination.tsx`

A pagination component that handles navigation between pages of data.

```typescriptreact
export default function Pagination({ currentPage, pageSize, total }: PaginationProps) {
  const dispatch = useAppDispatch()
  const pathname = usePathname()

  const isUsersPage = pathname === "/users"
  const totalPages = Math.ceil(total / pageSize)

  // Pagination logic...
}
```

Features:

- Dynamic page number generation
- First/last page links
- Previous/next buttons
- Handling for large number of pages with ellipsis


#### `Tabs.tsx`

A tab navigation component used in the Products page for category filtering.

```typescriptreact
export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
              activeTab === tab.id
                ? "border-yellow text-black"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
```

Features:

- Active tab highlighting
- Tab click handlers
- Styled with a border-bottom indicator


#### `PageSizeSelector.tsx`

A dropdown component to select the number of items to display per page.

```typescriptreact
export default function PageSizeSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()
  const pathname = usePathname()

  const isUsersPage = pathname === "/users"
  const pageSize = useAppSelector((state) => (isUsersPage ? state.users.pageSize : state.products.pageSize))

  // Dropdown logic...
}
```

Features:

- Custom styling with animation
- Options for 5, 10, 20, and 50 items per page
- Integration with Redux state


### Redux State Management

#### `usersSlice.ts`

Redux slice for managing user data state.

```typescriptreact
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (params: FetchUsersParams, { rejectWithValue }) => {
    try {
      // API request logic...
    } catch (error) {
      // Error handling...
    }
  }
)

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Actions...
  },
  extraReducers: (builder) => {
    // Async thunk handling...
  },
})
```

Features:

- Async thunk for fetching users from API
- Actions for pagination, search, and filtering
- Reducers for updating state


#### `productsSlice.ts`

Redux slice for managing product data state.

```typescriptreact
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params: FetchProductsParams, { rejectWithValue }) => {
    try {
      // API request logic...
    } catch (error) {
      // Error handling...
    }
  }
)

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Actions...
  },
  extraReducers: (builder) => {
    // Async thunk handling...
  },
})
```

Features:

- Async thunk for fetching products from API
- Actions for pagination, search, filtering, and category selection
- Reducers for updating state


## Installation

1. Clone the repository:


```shellscript
git clone https://github.com/eminAryan/react-data-tables.git
cd react-data-tables
```

2. Install dependencies:


```shellscript
npm install
```

3. Start the development server:


```shellscript
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.



## Component Breakdown

### Pages

#### `app/page.tsx`
The home page with navigation links to the Users and Products pages.

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-black">Data Tables App</h1>
      <div className="flex gap-4">
        <Link
          href="/users"
          className="px-6 py-3 bg-blue text-black font-semibold rounded-md hover:bg-yellow transition-colors"
        >
          Users Page
        </Link>
        <Link
          href="/products"
          className="px-6 py-3 bg-blue text-black font-semibold rounded-md hover:bg-yellow transition-colors"
        >
          Products Page
        </Link>
      </div>
    </main>
  )
}
```

#### `app/users/page.tsx`

The Users data table page that displays user data with filtering and pagination. It uses the Redux store to manage state and fetch data from the API.

Key features:

- Fetches user data from the API using Redux thunks
- Implements filtering by name, email, and gender
- Provides pagination and page size selection
- Includes breadcrumb navigation


#### `app/products/page.tsx`

The Products data table page that displays product data with filtering, tabs, and pagination. It includes special features like category tabs and brand filtering.

Key features:

- Fetches product data from the API using Redux thunks
- Implements filtering by title, brand, and category
- Provides category tabs for quick filtering
- Includes pagination and page size selection
- Ensures only one filter can be active at a time


### Components

#### `DataTable.tsx`

The core table component that renders data in rows and columns.

```typescriptreact
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

  // Rendering logic...
}
```

Features:

- Dynamic column rendering based on provided configuration
- Loading and error states
- Client-side filtering with lodash
- Responsive design with horizontal scrolling


#### `TableControls.tsx`

Controls that appear at the top of each data table.

```typescriptreact
export default function TableControls({
  pageSize,
  filterFields,
  onFilterChange,
  onSearchChange,
  searchTerm,
}: TableControlsProps) {
  // State and handlers...

  return (
    <div className="px-6 py-4 border-b flex items-center gap-6">
      {/* Page Size and Entries */}
      {/* Search Toggle */}
      {/* Column Filters */}
    </div>
  )
}
```

Features:

- Page size selector
- Search input toggle
- Column-specific filters with dropdown and text input options
- Filter reset functionality
- Ensures only one filter can be active at a time


#### `Pagination.tsx`

A pagination component that handles navigation between pages of data.

```typescriptreact
export default function Pagination({ currentPage, pageSize, total }: PaginationProps) {
  const dispatch = useAppDispatch()
  const pathname = usePathname()

  const isUsersPage = pathname === "/users"
  const totalPages = Math.ceil(total / pageSize)

  // Pagination logic...
}
```

Features:

- Dynamic page number generation
- First/last page links
- Previous/next buttons
- Handling for large number of pages with ellipsis


#### `Tabs.tsx`

A tab navigation component used in the Products page for category filtering.

```typescriptreact
export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
              activeTab === tab.id
                ? "border-yellow text-black"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
```

Features:

- Active tab highlighting
- Tab click handlers
- Styled with a border-bottom indicator


#### `PageSizeSelector.tsx`

A dropdown component to select the number of items to display per page.

```typescriptreact
export default function PageSizeSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()
  const pathname = usePathname()

  const isUsersPage = pathname === "/users"
  const pageSize = useAppSelector((state) => (isUsersPage ? state.users.pageSize : state.products.pageSize))

  // Dropdown logic...
}
```

Features:

- Custom styling with animation
- Options for 5, 10, 20, and 50 items per page
- Integration with Redux state


### Redux State Management

#### `usersSlice.ts`

Redux slice for managing user data state.

```typescriptreact
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (params: FetchUsersParams, { rejectWithValue }) => {
    try {
      // API request logic...
    } catch (error) {
      // Error handling...
    }
  }
)

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Actions...
  },
  extraReducers: (builder) => {
    // Async thunk handling...
  },
})
```

Features:

- Async thunk for fetching users from API
- Actions for pagination, search, and filtering
- Reducers for updating state


#### `productsSlice.ts`

Redux slice for managing product data state.

```typescriptreact
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params: FetchProductsParams, { rejectWithValue }) => {
    try {
      // API request logic...
    } catch (error) {
      // Error handling...
    }
  }
)

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Actions...
  },
  extraReducers: (builder) => {
    // Async thunk handling...
  },
})
```

Features:

- Async thunk for fetching products from API
- Actions for pagination, search, filtering, and category selection
- Reducers for updating state


## Installation

1. Clone the repository:


```shellscript
git clone https://github.com/eminAryan/react-data-tables.git
cd react-data-tables
```

2. Install dependencies:


```shellscript
npm install
```

3. Start the development server:


```shellscript
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.


## Usage

### Home Page

The home page provides navigation to the Users and Products pages.

### Users Page

The Users page displays a table of user data with the following features:

- **Search**: Use the search icon to toggle the search input and filter users
- **Filters**: Click on Name, Email, or Gender to filter by specific fields
- **Pagination**: Navigate between pages using the pagination controls
- **Page Size**: Change the number of users displayed per page


### Products Page

The Products page displays a table of product data with the following features:

- **Tabs**: Toggle between All products and Laptops
- **Search**: Use the search icon to toggle the search input and filter products
- **Filters**: Click on Title, Brand, or Category to filter by specific fields
- **Pagination**: Navigate between pages using the pagination controls
- **Page Size**: Change the number of products displayed per page


## API Integration

The application integrates with the DummyJSON API to fetch user and product data. The API endpoints used are:

- **Users**: `https://dummyjson.com/users`
- **User Search**: `https://dummyjson.com/users/search?q={query}`
- **User Filter**: `https://dummyjson.com/users/filter?key=gender&value={gender}`
- **Products**: `https://dummyjson.com/products`
- **Product Search**: `https://dummyjson.com/products/search?q={query}`
- **Product Category**: `https://dummyjson.com/products/category/{category}`


### API Request Flow

1. **User selects a filter or changes page**: The component dispatches an action to update the Redux state
2. **useEffect hook triggers**: The effect detects the state change and dispatches the fetch thunk
3. **Thunk executes**: The thunk builds the appropriate URL based on the filters and makes the API request
4. **Response handling**: The response is processed and stored in the Redux state
5. **Component re-renders**: The component displays the updated data from the Redux state


Example API request from `productsSlice.ts`:

```typescriptreact
// Handle specific filters
if (params.category) {
  // Category filter takes precedence
  url = `https://dummyjson.com/products/category/${params.category}`;
  console.log(`Using category endpoint: ${url}`);
} 
else if (params.title) {
  // Title search
  url = 'https://dummyjson.com/products/search';
  queryParams.append("q", params.title);
  console.log(`Using title search: ${url}`);
}
else if (params.brand) {
  // Brand search
  url = 'https://dummyjson.com/products/search';
  queryParams.append("q", params.brand);
  console.log(`Using brand search: ${url}`);
}
```


## Component Breakdown

### Pages

#### `app/page.tsx`
The home page with navigation links to the Users and Products pages.

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-black">Data Tables App</h1>
      <div className="flex gap-4">
        <Link
          href="/users"
          className="px-6 py-3 bg-blue text-black font-semibold rounded-md hover:bg-yellow transition-colors"
        >
          Users Page
        </Link>
        <Link
          href="/products"
          className="px-6 py-3 bg-blue text-black font-semibold rounded-md hover:bg-yellow transition-colors"
        >
          Products Page
        </Link>
      </div>
    </main>
  )
}
```

#### `app/users/page.tsx`

The Users data table page that displays user data with filtering and pagination. It uses the Redux store to manage state and fetch data from the API.

Key features:

- Fetches user data from the API using Redux thunks
- Implements filtering by name, email, and gender
- Provides pagination and page size selection
- Includes breadcrumb navigation


#### `app/products/page.tsx`

The Products data table page that displays product data with filtering, tabs, and pagination. It includes special features like category tabs and brand filtering.

Key features:

- Fetches product data from the API using Redux thunks
- Implements filtering by title, brand, and category
- Provides category tabs for quick filtering
- Includes pagination and page size selection
- Ensures only one filter can be active at a time


### Components

#### `DataTable.tsx`

The core table component that renders data in rows and columns.

```typescriptreact
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

  // Rendering logic...
}
```

Features:

- Dynamic column rendering based on provided configuration
- Loading and error states
- Client-side filtering with lodash
- Responsive design with horizontal scrolling


#### `TableControls.tsx`

Controls that appear at the top of each data table.

```typescriptreact
export default function TableControls({
  pageSize,
  filterFields,
  onFilterChange,
  onSearchChange,
  searchTerm,
}: TableControlsProps) {
  // State and handlers...

  return (
    <div className="px-6 py-4 border-b flex items-center gap-6">
      {/* Page Size and Entries */}
      {/* Search Toggle */}
      {/* Column Filters */}
    </div>
  )
}
```

Features:

- Page size selector
- Search input toggle
- Column-specific filters with dropdown and text input options
- Filter reset functionality
- Ensures only one filter can be active at a time


#### `Pagination.tsx`

A pagination component that handles navigation between pages of data.

```typescriptreact
export default function Pagination({ currentPage, pageSize, total }: PaginationProps) {
  const dispatch = useAppDispatch()
  const pathname = usePathname()

  const isUsersPage = pathname === "/users"
  const totalPages = Math.ceil(total / pageSize)

  // Pagination logic...
}
```

Features:

- Dynamic page number generation
- First/last page links
- Previous/next buttons
- Handling for large number of pages with ellipsis


#### `Tabs.tsx`

A tab navigation component used in the Products page for category filtering.

```typescriptreact
export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
              activeTab === tab.id
                ? "border-yellow text-black"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
```

Features:

- Active tab highlighting
- Tab click handlers
- Styled with a border-bottom indicator


#### `PageSizeSelector.tsx`

A dropdown component to select the number of items to display per page.

```typescriptreact
export default function PageSizeSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()
  const pathname = usePathname()

  const isUsersPage = pathname === "/users"
  const pageSize = useAppSelector((state) => (isUsersPage ? state.users.pageSize : state.products.pageSize))

  // Dropdown logic...
}
```

Features:

- Custom styling with animation
- Options for 5, 10, 20, and 50 items per page
- Integration with Redux state


### Redux State Management

#### `usersSlice.ts`

Redux slice for managing user data state.

```typescriptreact
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (params: FetchUsersParams, { rejectWithValue }) => {
    try {
      // API request logic...
    } catch (error) {
      // Error handling...
    }
  }
)

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Actions...
  },
  extraReducers: (builder) => {
    // Async thunk handling...
  },
})
```

Features:

- Async thunk for fetching users from API
- Actions for pagination, search, and filtering
- Reducers for updating state


#### `productsSlice.ts`

Redux slice for managing product data state.

```typescriptreact
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params: FetchProductsParams, { rejectWithValue }) => {
    try {
      // API request logic...
    } catch (error) {
      // Error handling...
    }
  }
)

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Actions...
  },
  extraReducers: (builder) => {
    // Async thunk handling...
  },
})
```

Features:

- Async thunk for fetching products from API
- Actions for pagination, search, filtering, and category selection
- Reducers for updating state


## Installation

1. Clone the repository:


```shellscript
git clone https://github.com/eminAryan/react-data-tables.git
cd react-data-tables
```

2. Install dependencies:


```shellscript
npm install
```

3. Start the development server:


```shellscript
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.


## Usage

### Home Page

The home page provides navigation to the Users and Products pages.

### Users Page

The Users page displays a table of user data with the following features:

- **Search**: Use the search icon to toggle the search input and filter users
- **Filters**: Click on Name, Email, or Gender to filter by specific fields
- **Pagination**: Navigate between pages using the pagination controls
- **Page Size**: Change the number of users displayed per page


### Products Page

The Products page displays a table of product data with the following features:

- **Tabs**: Toggle between All products and Laptops
- **Search**: Use the search icon to toggle the search input and filter products
- **Filters**: Click on Title, Brand, or Category to filter by specific fields
- **Pagination**: Navigate between pages using the pagination controls
- **Page Size**: Change the number of products displayed per page


## API Integration

The application integrates with the DummyJSON API to fetch user and product data. The API endpoints used are:

- **Users**: `https://dummyjson.com/users`
- **User Search**: `https://dummyjson.com/users/search?q={query}`
- **User Filter**: `https://dummyjson.com/users/filter?key=gender&value={gender}`
- **Products**: `https://dummyjson.com/products`
- **Product Search**: `https://dummyjson.com/products/search?q={query}`
- **Product Category**: `https://dummyjson.com/products/category/{category}`


### API Request Flow

1. **User selects a filter or changes page**: The component dispatches an action to update the Redux state
2. **useEffect hook triggers**: The effect detects the state change and dispatches the fetch thunk
3. **Thunk executes**: The thunk builds the appropriate URL based on the filters and makes the API request
4. **Response handling**: The response is processed and stored in the Redux state
5. **Component re-renders**: The component displays the updated data from the Redux state


Example API request from `productsSlice.ts`:

```typescriptreact
// Handle specific filters
if (params.category) {
  // Category filter takes precedence
  url = `https://dummyjson.com/products/category/${params.category}`;
  console.log(`Using category endpoint: ${url}`);
} 
else if (params.title) {
  // Title search
  url = 'https://dummyjson.com/products/search';
  queryParams.append("q", params.title);
  console.log(`Using title search: ${url}`);
}
else if (params.brand) {
  // Brand search
  url = 'https://dummyjson.com/products/search';
  queryParams.append("q", params.brand);
  console.log(`Using brand search: ${url}`);
}
```

## State Management

The application uses Redux Toolkit for state management with the following features:

- **Store**: Configured with users and products reducers
- **Slices**: Separate slices for users and products state
- **Thunks**: Async thunks for API requests
- **Actions**: Actions for updating pagination, search, and filters
- **Hooks**: Custom hooks for accessing dispatch and selector functions


### Redux Store Structure

```typescriptreact
// store.ts
export const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
  },
})
```

### Custom Redux Hooks

```typescriptreact
// hooks.ts
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

## Styling

The application is styled using Tailwind CSS with a custom configuration:

- **Colors**: Custom color scheme with blue, yellow, and gray accents
- **Typography**: Custom Neutra Text font family
- **Components**: Custom styling for buttons, inputs, and tables
- **Responsive Design**: Mobile-first approach with responsive breakpoints


### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#322625",
        grey: "#ebebeb",
        blue: "#c0e3e5",
        yellow: "#fdc936",
        // Additional colors...
      },
      fontFamily: {
        sans: ["Neutra Text", "sans-serif"],
      },
      // Additional theme extensions...
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### Custom Font Setup

```css
/* globals.css */
@font-face {
  font-family: "Neutra Text";
  src: url("/fonts/NeutraText-Book.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Neutra Text";
  src: url("/fonts/NeutraText-Bold.woff2") format("woff2");
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}
```

## Conclusion

React Data Tables is a comprehensive demonstration of modern React development practices, showcasing reusable components, efficient state management with Redux Toolkit, and responsive design with Tailwind CSS. The application provides a clean and intuitive interface for displaying and filtering data from external APIs.
