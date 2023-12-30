import { type Episode, type Anime } from '../../../../types/Anime'
import { type LangSupport, type ScrapEpisode } from '../../../../types/ScrapEpisode'
import { copyDeepObject } from '../../utils/general'

interface Params {
  anime: Anime
  episodeScraper: ScrapEpisode
  namePage: string
  defaultLang: LangSupport
}
export default function joinEpisodes({ anime, episodeScraper, namePage, defaultLang }: Params) {
  const animeCopy = copyDeepObject(anime)
  const timeNow = Date.now()
  const namePageStr = episodeScraper.lang === defaultLang ? namePage : namePage + episodeScraper.lang
  const pages = animeCopy.pages
  const page = pages[namePageStr]
  const episodes = page.episodes
  let hasUpdated = false
  const lastEpisodeParsed = episodeScraper.episode === -1 ? anime.episodes : episodeScraper.episode
  if (!lastEpisodeParsed) return null
  const episodeNumber = lastEpisodeParsed - page.startCount
  const notFound = -1
  const episodeIndex = page.episodes.findIndex(e => e.episode === episodeNumber)

  if (episodeIndex === notFound) {
    const episode: Episode = {
      episode: episodeNumber,
      lastUpdate: timeNow,
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
  page.lastUpdate = timeNow
  pages[namePageStr] = page
  animeCopy.pages = pages
  return animeCopy
}
