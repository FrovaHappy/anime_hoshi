import { type Episode, type Anime } from '../../../../types/Anime'
import { type ScrapEpisode } from '../../../../types/ScrapEpisode'

interface Params {
  anime: Anime
  episodeScraper: ScrapEpisode
  namePage: string
}
export default function joinEpisodes({ anime, episodeScraper, namePage }: Params) {
  const animeCopy: Anime = JSON.parse(JSON.stringify(anime))
  const pages = animeCopy.pages
  const page = pages[namePage]
  const episodes = page.episodes
  const notFound = -1
  const episodeIndex = page.episodes.findIndex(e => e.episode === episodeScraper.episode)
  if (episodeIndex === notFound) {
    const episode: Episode = {
      episode: episodeScraper.episode,
      lastUpdate: Date.now(),
      link: episodeScraper.link
    }
    page.episodes = [episode, ...episodes]
  }
  pages[namePage] = page
  animeCopy.pages = pages
  return animeCopy
}
