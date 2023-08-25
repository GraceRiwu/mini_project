import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import AddStarshipContext from "./AddStarshipContext"
import Details from "./Details"
import SearchParams from "./SearchParams"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
})

const App = () => {
  const addStarship = useState(null)
  return (
    <div className="">
      <BrowserRouter>
        <AddStarshipContext.Provider value={addStarship}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </QueryClientProvider>
        </AddStarshipContext.Provider>
      </BrowserRouter>
    </div>
  )
}

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App />)
