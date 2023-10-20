import { type InfoEpisodeRecovered } from '../../../../types'
import { type Anime } from '../../../../types/Anime'
import { EpisodeNumber } from '../../Enum'
interface Params {
  database: Anime
  episodeSrap: InfoEpisodeRecovered
  namePage: string
}
export default async function compareEpisodes ({ database, episodeSrap, namePage }: Params) {
  let hasUpdated = false
  const page = database.pages[namePage]
  const episodes = page.episodes
  let lastUpdate = database.lastUpdate

  if (episodeSrap.episode === EpisodeNumber.lastEpisodeNotFound) {
    episodeSrap.episode = database.dataAnilist.episodes ?? (episodes[0].episode ?? 0) + 1
  }
  episodeSrap.episode -= page.startCount
  const epExists = episodes.some(ep => ep.episode === episodeSrap.episode)

  if (!epExists) {
    hasUpdated = true
    episodes.push({
      episode: episodeSrap.episode,
      lastUpdate: Date.now(),
      link: episodeSrap.url
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
