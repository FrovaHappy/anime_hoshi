import { useParams } from 'react-router-dom'
import { AnimeList } from '../../../types'
import { EpisodesConteiner } from './episodesConteiner'
import '../styles/animeInfo.scss'
import { List } from '../../types'
interface props {
  animeList: AnimeList[]
}

function listPageLinks(anime: AnimeList) {
  let list: List = {}
  const ArrayKeyepisodes = Object.keys(anime.episodes)

  ArrayKeyepisodes.forEach((keyepisode) => {
    const episode = anime.episodes[keyepisode]!
    const keynamePagesArray = Object.keys(episode.pagesUrl)

    keynamePagesArray.forEach((namePage) => {
      const url = episode.pagesUrl[namePage]!
      const update = episode.updateEpisode
      const element = {
        url,
        update,
        episode: parseInt(keyepisode),
      }
      let listElementModified = list[namePage]
      if (!listElementModified) {
        list[namePage] = [element]
      } else {
        listElementModified.push(element)
        list[namePage] = listElementModified
      }
    })
  })
  console.log(list)
  return list
}
export function AnimeInfo({ animeList }: props) {
  const { id } = useParams()
  if (!id) return <div className="anime-info">animeInfo</div>
  const anime = animeList.find((anime) => anime.dataAnilist.id === parseInt(id))
  if (!anime) return <div className="anime-info"> no found </div>
  const list = listPageLinks(anime)
  const color = anime?.dataAnilist.coverImage.color || '#fff'
  return (
    <div className="anime-info">
      <h3 className="anime-info__title" style={{ color: color }}>
        {anime.dataAnilist.title.romaji}
      </h3>
      <EpisodesConteiner list={list} color={color} />
    </div>
  )
}
