import { useEffect, useState } from 'react'
import { useAnimesContext } from '../../contexts/contextHome'

export const useFetch = (url: string) => {
  const { setAnimes } = useAnimesContext()
  const [data, _setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const query = async () => {
    await fetch(url)
      .then((response) => response.json())
      .then((response) => setAnimes(response.reverse()))
      .finally(() => setLoading(false))
      .catch(() => setError(true))
  }

  useEffect(() => {
    query()
  }, [])
  return { data, loading, error }
}
