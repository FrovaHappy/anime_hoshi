import { AnimeList, EpisodesContent } from '../../../../../types'
import { List } from '../../../../types'

const episodesFormat = (listOrdenatedForPage: List, episode: EpisodesContent, namePage: string, keyEpisode: string) => {
  let pageUrl = episode.pagesUrl[namePage]!
  let url = typeof pageUrl === 'string' ? pageUrl : pageUrl.url

  const update = typeof pageUrl === 'string' ? episode.updateEpisode : pageUrl.update
  const element = {
    url,
    update,
    episode: parseInt(keyEpisode),
  }
  listOrdenatedForPage[namePage] = [...(listOrdenatedForPage[namePage] ?? []), element]
  
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
