const fetchStarship = async ({ queryKey }) => {
  const id = queryKey[1]
  const apiRes = await fetch(`https://swapi.dev/api/starships/${id}`)

  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch not ok`)
  }

  return apiRes.json()
}

export default fetchStarship
