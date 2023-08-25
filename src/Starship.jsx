import { Link } from "react-router-dom"

const Starship = ({starship}) => {
  const { name, model, starship_class, url } = starship
  let id = url?.split('/')
  // let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  // if (images.length) {
  //   hero = images[0];
  // }
  return (
    <Link
      to={`/details/${id[5]}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
    >
      <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-72">
        <img
          src="https://i.pinimg.com/564x/2e/52/6a/2e526aebe5d5fa4d8db36d1e25d07c3c.jpg"
          alt=""
          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h1 className="font-semibold uppercase-text">{name}</h1>
        <h2 className="text-sm text-gray-500">{`${name} — ${model} — ${starship_class}`}</h2>
      </div>
    </Link>
  )
}

export default Starship
