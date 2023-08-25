import { useState, useContext, useTransition } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { CheckCircleIcon } from "@heroicons/react/solid"
import Results from "./Results"
import fetchSearch from "./fetchSearch"
import AddStarshipContext from "./AddStarshipContext"

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    name: "",
    model: "",
  })

  const [addStarship] = useContext(AddStarshipContext)
  const [isPending, startTransition] = useTransition()

  const results = useQuery(["search", requestParams], fetchSearch)
  const starships = results?.data?.results ?? []

  return (
    <div>
      <div className="w-full mb-2 text-center p-7 bg-black">
        <Link
          className="font text-6xl font-semibold text-white hover:text-white"
          to="/"
        >
          STARSHIP
        </Link>
      </div>
      <div className="search-params my-0 mx-auto w-9/12">
        {addStarship ? (
          <div className="justify-center items-center mb-8 mx-auto">
            <div className="bg-white border-l-4 border-gray-600 p-4 mt-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircleIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-black">
                    Successfully added {addStarship.name}!
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <form
          className="p-10 mb-10 rounded-lg bg-white ring-1 ring-inset ring-gray-300 shadow-lg flex flex-row justify-center"
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.target)
            const obj = {
              name: formData.get("name") ?? "",
              model: formData.get("model") ?? "",
            }
            startTransition(() => {
              setRequestParams(obj)
            })
          }}
        >
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5">
            {/* <div className="sm:col-span-2 col-span-1"> */}
            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="name"
                className="block text-sm leading-6 text-white"
              >
                <input
                  className="custom-input block w-full rounded-md border-0 py-1.5 pl-3 pr-10 bg-gray-900 text-white ring-1 ring-inset ring-gray focus:ring-2 focus:ring-gray-600 sm:text-sm sm:leading-6"
                  id="name"
                  name="name"
                  placeholder="Name"
                  // onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="model"
                className="block text-sm leading-6 text-gray-900"
              >
                <input
                  className="custom-input block w-full rounded-md border-0 py-1.5 pl-3 pr-10 bg-gray-900 text-white ring-1 ring-inset ring-gray focus:ring-2 focus:ring-gray-600 sm:text-sm sm:leading-6"
                  id="model"
                  name="model"
                  placeholder="Model"
                  // onChange={(e) => setModel(e.target.value)}
                />
              </label>
            </div>
            <div className="sm:col-span-1 justify-center mx-auto">
              <button className="rounded px-6 py-2 text-white border-none bg-black hover:bg-white hover:text-black hover:ring-2 hover:ring-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-50">
                Submit
              </button>
            </div>
          </div>
        </form>
        <Results starships={starships} />
      </div>
    </div>
  )
}

export default SearchParams
