import { useState, useEffect } from "react"

const localCache = {}

export default function useNameList(brand) {
  const [nameList, setNameList] = useState([])
  const [status, setStatus] = useState("unloaded")

  // console.log(brand);
  useEffect(() => {
    if (!brand) {
      setNameList([])
    } else if (localCache[brand]) {
      setNameList(localCache[brand])
    } else {
      requestNameList()
    }

    async function requestNameList() {
      setNameList([])
      setStatus("loading")
      const res = await fetch(
        `https://my-json-server.typicode.com/GraceRiwu/db-shoes-json/shoes?brand=${brand}`
      )
      const json = await res.json()
      console.log(json)
      localCache[brand] = json.name || []
      setNameList(localCache[brand])
      setStatus("loaded")
    }
  }, [brand])

  return [nameList, status]
}
