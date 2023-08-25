const fetchSearch = async ({ queryKey }) => {
  const { name, model } = queryKey[1]
  const res = await fetch(
    `https://swapi.dev/api/starships?search=${name}&model=${model}`
  )

  if (!res.ok) {
    throw new Error(`starship search not okay: ${name}, ${model}`)
  }

  return res.json()
}

export default fetchSearch
