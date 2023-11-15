import { type InfoEpisodeRecovered } from '../../../../types'
import { type Anime } from '../../../../types/Anime'
import { EpisodeNumber } from '../../Enum'
interface Params {
  database: Anime
  episodeScrap: InfoEpisodeRecovered
  namePage: string
}
export default async function compareEpisodes({ database, episodeScrap, namePage }: Params) {
  let hasUpdated = false
  const page = database.pages[namePage]
  const episodes = page.episodes
  let lastUpdate = database.lastUpdate

  if (episodeScrap.episode === EpisodeNumber.lastEpisodeNotFound) {
    episodeScrap.episode = database.dataAnilist.episodes ?? (episodes[0].episode ?? 0) + 1
  }
  episodeScrap.episode -= page.startCount
  const epExists = episodes.some(ep => ep.episode === episodeScrap.episode)

  if (!epExists) {
    hasUpdated = true
    episodes.push({
      episode: episodeScrap.episode,
      lastUpdate: Date.now(),
      link: episodeScrap.url
    })
    episodes.sort((a, b) => b.episode - a.episode)
    page.episodes = episodes
    lastUpdate = Date.now()
  }

  page.lastUpdate = lastUpdate

  const pages = database.pages
  pages[namePage] = page
  database.pages = pages
  database.lastUpdate = lastUpdate

  return { database, hasUpdated }
}
