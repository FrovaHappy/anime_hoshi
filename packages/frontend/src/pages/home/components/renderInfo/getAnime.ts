import { useEffect, useState } from 'react'
import { urlApi } from '../../../../config'
import useFetch from '../../../../hooks/useFetch'
import { type Anime } from '../../../../../../types/Anime'
import { useShowChildren } from '../../../contexts/Menu'

type AnimesError = 'badRequest' | 'errorInResult' | ''

export function getAnime(animeId: string | null) {
  const [load, setLoad] = useState(true)
  const { setShowMenu } = useShowChildren()
  const [anime, setAnime] = useState<Anime | null>(null)
  const [error, setError] = useState<AnimesError>('')
  const fetchAnimes = async () => {
    const response = await useFetch({ url: `${urlApi ?? ''}/animes?id=${animeId ?? ''}`, method: 'GET' })
    response.code === 200 ? setAnime(response.contents) : setError('errorInResult')
    setLoad(false)
  }
  useEffect(() => {
    setLoad(true)
    setError('')
    if (animeId) {
      fetchAnimes().catch(error => {
        console.error(error)
      })
      setShowMenu(true)
    } else {
      setAnime(null)
      setLoad(false)
    }
  }, [animeId])
  return { load, error, anime }
}
