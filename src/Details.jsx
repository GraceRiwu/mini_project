import { useNavigate, useParams } from "react-router-dom"
import { Fragment, useRef, useState, useContext } from "react"
import { useQuery } from "@tanstack/react-query"
import { Dialog, Transition, Tab } from "@headlessui/react"
// import { HeartIcon, MinusIcon } from "@heroicons/react/24/outline"
import fetchStarship from "./fetchStarship"
import ErrorBoundary from "./ErrorBoundary"
import AddStarshipContext from "./AddStarshipContext"
import Modal from "./Modal"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const Details = () => {
  const { id } = useParams()
  const results = useQuery(["details", id], fetchStarship)
  // eslint-disable-next-line no-unused-vars
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const [, setAddStarship] = useContext(AddStarshipContext)

  if (results.isLoading) {
    return (
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    )
  }
  const starship = results.data

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
      <div className="mb-3">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li className="text-sm">
              <a
                href="/"
                aria-current="page"
                className="font-medium text-white hover:text-gray-400"
              >
                Homepage 
              </a>
            </li>
            <li className="text-white">
              /
            </li>
            <li className="text-sm">
              <a
                href={starship.href}
                aria-current="page"
                className="font-medium text-white hover:text-gray-400"
              >
                {starship.name}
              </a>
            </li>
          </ol>
        </nav>
      </div>
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                <Tab className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm uppercase text-white font-bold hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4">
                  {({ selected }) => (
                    <>
                      <span className="sr-only">{starship.name}</span>
                      <span className="absolute inset-0 overflow-hidden rounded-md">
                        <img
                          src="https://i.pinimg.com/564x/42/8f/ee/428fee66b69d1bc00d1dd5e3a77db4f5.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </span>
                      <span
                        className={classNames(
                          selected ? "ring-gray-600" : "ring-transparent",
                          "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                        )}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </Tab>
              </Tab.List>
            </div>

            <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
              <Tab.Panel>
                <img
                  src="https://i.pinimg.com/564x/42/8f/ee/428fee66b69d1bc00d1dd5e3a77db4f5.jpg"
                  alt=""
                  className="h-96 w-full object-cover object-center sm:rounded-lg"
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          <div className="flex flex-col">
            <div className="px-4 sm:px-0">
              <h3 className="uppercase-text text-2xl leading-7 text-white font-bold">
                {starship.name}
              </h3>
            </div>
            <div className="mt-6 border-t border-gray-300">
              <dl className="divide-y divide-gray-300">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm leading-6 text-white font-bold">
                    Model
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
                    {starship.model}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm leading-6 text-white font-bold">
                    Starship Class
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
                    {starship.starship_class}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm leading-6 text-white font-bold">
                    Manufacturer
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
                    {starship.manufacturer}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm leading-6 text-white font-bold">
                    Cargo Capacity
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
                    {starship.cargo_capacity}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm leading-6 text-white font-bold">
                    Crew
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
                    {starship.crew}
                  </dd>
                </div>
              </dl>
              {/*
            <p className="font-bold text-4xl">{starship.name}</p>
            <p>{`${starship.model} — ${starship.starship_class} `}</p>
             <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div
              className="space-y-6 text-base text-white"
              dangerouslySetInnerHTML={{ __html: pet.description }}
            />*/}
            </div>
            <div className="mt-6 flex">
              <button
                className="uppercase-text flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-bold text-black hover:bg-gray-900 hover:text-white hover:ring-2 hover:ring-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                onClick={() => setShowModal(true)}
              >
                Add {starship.name}
              </button>
            </div>

            {showModal && (
              <Modal>
                <Transition.Root show={showModal} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={() => setShowModal(false)}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                          enterTo="opacity-100 translate-y-0 sm:scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                            <div>
                              <div className="mt-3 text-center sm:mt-5">
                                <Dialog.Title
                                  as="h3"
                                  className="text-base leading-6 text-black font-bold"
                                >
                                  Would you like to adopt {starship.name}?
                                </Dialog.Title>
                                {/* <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                  Lorem ipsum, dolor sit amet consectetur
                                  adipisicing elit. Eius aliquam laudantium
                                  explicabo pariatur iste dolorem animi vitae
                                  error totam. At sapiente aliquam accusamus
                                  facere veritatis.
                                </p>
                              </div> */}
                              </div>
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                              <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm border-none bg-black hover:bg-white hover:text-black hover:ring-2 hover:ring-black  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:col-start-2"
                                onClick={() => {
                                  setAddStarship(starship)
                                  navigate("/")
                                }}
                              >
                                Yes
                              </button>
                              <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-black hover:text-white hover:ring-2 hover:ring-gray-300 sm:col-start-1 sm:mt-0"
                                onClick={() => setShowModal(false)}
                              >
                                No
                              </button>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition.Root>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  )
}
