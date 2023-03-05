import { Navigate } from 'react-router-dom'
import { EpisodesConteiner } from './components/animeInfo__body'
import '../../styles/pages/home/homeInfo.scss'
import { AnimeInfoHeader } from './components/animeInfo__header'
import { listPageLinks } from './utils/listsPagesLinks'
import { AnimeList } from '../../../../types'
import { Welcome } from './components/Welcome'
import { Contribute } from './components/contribute'
interface props {
  animes: AnimeList[]
  id: number | undefined
}

export function AnimeInfo({ animes, id }: props) {
  if (!id) return <Welcome />
  const anime = animes.find((anime) => anime.dataAnilist.id === id)
  if (!anime) return Navigate({ to: '/', replace: true })
  const list = listPageLinks(anime)
  return (
    <div className="anime-info">
      <AnimeInfoHeader anime={anime} />
      <EpisodesConteiner list={list} id={id} anime={anime} />
      <Contribute />
    </div>
  )
}
