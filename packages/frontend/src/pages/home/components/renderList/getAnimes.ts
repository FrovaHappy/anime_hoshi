import { urlApi } from '../../../../config'
import useFetch from '../../../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { useContextAnimes } from '../../../contexts/contextHome'

type AnimesError = 'badRequest' | 'cacheEmpty' | ''
export function getAnimes() {
  const { setAnimesMinfied } = useContextAnimes()
  const [load, setLoad] = useState(true)
  const [error, setError] = useState<AnimesError>('')
  const fethAnimes = async () => {
    const response = await useFetch({ url: `${urlApi ?? ''}/animes`, method: 'GET' }).catch(() => { setError('badRequest') })
    console.log(response)
    response?.code === 200 ? setAnimesMinfied(response.contents.animes) : setError('cacheEmpty')
    setLoad(false)
  }
  useEffect(() => {
    fethAnimes().catch((error) => { console.error(error) })
  }, [])
  return { load, error }
}
