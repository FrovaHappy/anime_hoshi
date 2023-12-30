import { type LangSupport, type ScrapEpisode } from '../../../../types/ScrapEpisode'
import animeDb from '../../database/anime.db'
import episodeErrorDb from '../../database/episodeError.db'
import animesCache from '../../utils/animesCache'
import { buildPages, updateAnilist } from './buildsProperties'
import findAnime from './findAnime'
import joinEpisodes from './joinEpisodes'
import sendNotifications from './pushNotifications'

interface Params {
  namePage: string
  episodeScraper: ScrapEpisode
  defaultLang: LangSupport
}

async function errorAnime(params: Params) {
  const { episodeScraper, namePage } = params
  await episodeErrorDb.createOrUpdate({
    ...episodeScraper,
    errorCapture: 'anime not found in the database or anilist',
    isOpen: true,
    namePage,
    timestamp: Date.now()
  })
}
/** @returns Returns `true` if it was updated, if not return `false`. */
export default async function updateAnime(params: Params) {
  const { episodeScraper, defaultLang, namePage } = params
  let anime = await findAnime({ title: episodeScraper.title })
  if (!anime) {
    await errorAnime(params)
    return
  }
  const timestampBefore = anime.lastUpdate
  anime = await updateAnilist(anime)
  anime = buildPages({ anime, namePage, lang: episodeScraper.lang, defaultLang })
  const animeAndEpisodes = joinEpisodes({ anime, namePage, episodeScraper, defaultLang })

  if (!animeAndEpisodes && anime.lastUpdate !== timestampBefore) return false
  if (animeAndEpisodes) {
    anime = animeAndEpisodes
    animesCache.set(anime.id)
    sendNotifications.setMissingUpdated(anime.id)
  }
  await animeDb.updateOne({ anime, filter: { id: anime.id } })
  return true
}
