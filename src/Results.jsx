import Starship from "./Starship"

const Results = ({ starships }) => {
  console.log(starships)
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {!starships.length ? (
        <h1 className="text-white">No Starship Found</h1>
      ) : (
        starships.map((starship, i) => {
          return (
            <Starship
              key={starship.id}
              starship={starship}
            />
          )
        })
      )}
    </div>
  )
}

export default Results
