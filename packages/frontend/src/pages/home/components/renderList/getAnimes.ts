import { urlApi } from '../../../../config'
import useFetch from '../../../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { useAnimesContext } from '../../../contexts/contextHome'

type AnimesError = 'badRequest' | 'cacheEmpty' | ''
export function getAnimes() {
  const { setAnimes } = useAnimesContext()
  const [load, setLoad] = useState(true)
  const [error, setError] = useState<AnimesError>('')
  const [animesUpdated, setAnimesUpdated] = useState(NaN)
  const fethAnimes = async () => {
    const response = await useFetch({ url: `${urlApi}/animes`, method: 'GET' }).catch(() => setError('badRequest'))
    response.code === 200 ? setAnimesUpdated(response.contents) : setError('cacheEmpty')
    setAnimes(response.contents.animes.reverse())
    setLoad(false)
    return
  }
  useEffect(() => {
    fethAnimes()
  }, [])
  return { load, error, animesUpdated }
}
