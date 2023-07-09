import { InfoEpisodeRecovered } from '../../../../types'
import { Anime } from '../../../../types/Anime'
type Params = { database: Anime; episodeSrap: InfoEpisodeRecovered; namePage: string }
export default async function compareEpisodes({ database, episodeSrap, namePage }: Params) {
  let hasUpdated = false
  let page = database.pages[namePage]
  let episodes = page.episodes
  let lastUpdate = database.lastUpdate

  const epExists = episodes.some((ep) => ep.episode === episodeSrap.episode)

  if (!epExists) {
    hasUpdated = true
    episodes.push({
      episode: episodeSrap.episode,
      lastUpdate: Date.now(),
      link: episodeSrap.url,
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
