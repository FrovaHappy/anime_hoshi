import { useEffect, useState } from 'react'

export const useFetch = (url: string) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const query = async () => {
    await fetch(url)
      .then((response) => response.json())
      .then((response) => setData(response.reverse()))
      .finally(() => setLoading(false))
      .catch(() => setError(true))
  }

  useEffect(() => {
    query()
  }, [])
  return { data, loading, error }
}
