import { Navigate } from 'react-router-dom'
import { AnimeList, EpisodesContent } from '../../../../types'
import { EpisodesConteiner } from './components/animeInfo__body'
import './styles/animeInfo.scss'
import { List } from '../../../types'
interface props {
  animes: AnimeList[]
  id: number | undefined
}
const episodesFormat = (listOrdenatedForPage: List, episode: EpisodesContent, namePage: string, keyEpisode: string) => {
  const url = episode.pagesUrl[namePage]!
  const update = episode.updateEpisode
  const element = {
    url,
    update,
    episode: parseInt(keyEpisode),
  }
  let listElementModified = listOrdenatedForPage[namePage]
  if (!listElementModified) {
    listOrdenatedForPage[namePage] = [element]
  } else {
    listElementModified.push(element)
    listOrdenatedForPage[namePage] = listElementModified
  }
  return listOrdenatedForPage
}

function listPageLinks(anime: AnimeList) {
  let list: List = {}
  const ArrayKeyepisodes = Object.keys(anime.episodes)

  ArrayKeyepisodes.forEach((keyepisode) => {
    const episode = anime.episodes[keyepisode]!
    const keynamePagesArray = Object.keys(episode.pagesUrl)

    keynamePagesArray.forEach((namePage) => {
      list = episodesFormat(list, episode, namePage, keyepisode)
    })
  })
  return list
}

export function AnimeInfo({ animes, id }: props) {
  if (!id) return <div className="anime-info">animeInfo</div>
  const anime = animes.find((anime) => anime.dataAnilist.id === id)
  if (!anime) return Navigate({ to: '/', replace: true })
  const list = listPageLinks(anime)
  const color = anime?.dataAnilist.coverImage.color || '#fff'
  return (
    <div className="anime-info">
      <h3 className="anime-info__title" style={{ color: color }}>
        {anime.dataAnilist.title.romaji}
      </h3>
      <EpisodesConteiner list={list} color={color} anime={anime} />
    </div>
  )
}
