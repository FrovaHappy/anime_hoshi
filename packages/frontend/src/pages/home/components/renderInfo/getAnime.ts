import { useEffect, useState } from 'react'
import { urlApi } from '../../../../config'
import useFetch from '../../../../hooks/useFetch'
import { type Anime } from '../../../../../../types/Anime'

type AnimesError = 'badRequest' | 'errorInResult' | ''

export function getAnime(animeId: string | null) {
  const [load, setLoad] = useState(true)
  const [anime, setAnime] = useState<Anime | null>(null)
  const [error, setError] = useState<AnimesError>('')
  const fethAnimes = async () => {
    const response = await useFetch({ url: `${urlApi ?? ''}/animes?id=${animeId ?? ''}`, method: 'GET' }).catch(() => { setError('badRequest') })
    response.code === 200 ? setAnime(response.contents) : setError('errorInResult')
    setLoad(false)
  }
  useEffect(() => {
    setLoad(true)
    setError('')
    if (animeId) {
      fethAnimes().catch((error) => { console.error(error) })
    } else {
      setAnime(null)
      setLoad(false)
      console.log(anime?.dataAnilist.id)
    }
  }, [animeId])
  return { load, error, anime }
}
