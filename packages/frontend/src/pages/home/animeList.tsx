import { useState } from 'react'
import { AnimeList } from '../../../../types'
import './styles/animeList.scss'

import { AnimeInfo } from './animeInfo'
import TargetAnime from './components/targetAnime'

interface props {
  animes: AnimeList[]
}

export function AnimeComponet({ animes }: props) {
  const [id, setId] = useState<number | undefined>()
  if (animes.length == 0) {
    return <h1>esta cargando</h1>
  }
  return (
    <>
      <div className="animeList">
        {animes.map((anime) => {
          const setShadows = anime.dataAnilist.id == id

          return <TargetAnime key={anime.dataAnilist.id} anime={anime} setId={setId} setShadows={setShadows} />
        })}
      </div>
      <AnimeInfo animes={animes} id={id} />
    </>
  )
}
