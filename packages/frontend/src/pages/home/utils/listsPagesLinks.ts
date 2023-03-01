import { AnimeList, EpisodesContent } from '../../../../../types'
import { List } from '../../../../types'

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

export function listPageLinks(anime: AnimeList) {
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
