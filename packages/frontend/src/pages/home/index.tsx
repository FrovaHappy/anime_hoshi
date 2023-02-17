import { useEffect, useState } from 'react'
import { AnimeList } from '../../../../types'
import { urlApi } from '../../config'
import { AnimeComponet } from './animeList'

function fetchAnimeList() {
  const [animeList, SetAnimelist] = useState<AnimeList[]>([])

  const query = async () => {
    const data = await fetch(`${urlApi}/animes`)
      .then((response) => response.json())
      .catch(() => [])
    const animelist = await data
    SetAnimelist(animelist.reverse())
  }

  useEffect(() => {
    query()
  }, [])
  return {
    animeList,
  }
}

export default function Home() {
  const { animeList } = fetchAnimeList()
  return (
    <>
      <AnimeComponet animes={animeList} />
    </>
  )
}
