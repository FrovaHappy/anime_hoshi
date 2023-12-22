import { type Episode, type Anime } from '../../../../types/Anime'
import { type ScrapEpisode } from '../../../../types/ScrapEpisode'
import { copyDeepObject } from '../../utils/general'

interface Params {
  anime: Anime
  episodeScraper: ScrapEpisode
  namePage: string
}
export default function joinEpisodes({ anime, episodeScraper, namePage }: Params) {
  const animeCopy = copyDeepObject(anime)
  const pages = animeCopy.pages
  const page = pages[namePage]
  const episodes = page.episodes
  let hasUpdated = false

  const episodeNumber = episodeScraper.episode - page.startCount
  const notFound = -1
  const episodeIndex = page.episodes.findIndex(e => e.episode === episodeNumber)

  if (episodeIndex === notFound) {
    const episode: Episode = {
      episode: episodeNumber,
      lastUpdate: Date.now(),
      link: episodeScraper.link
    }
    page.episodes = [episode, ...episodes]
    hasUpdated = true
  } else {
    const episode = page.episodes[episodeIndex]
    hasUpdated = episode.link !== episodeScraper.link
    episode.link = episodeScraper.link
  }
  if (!hasUpdated) return null
  pages[namePage] = page
  animeCopy.pages = pages
  return animeCopy
}
