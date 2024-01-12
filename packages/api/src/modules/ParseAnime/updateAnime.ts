import { type LangSupport, type ScrapEpisode } from '../../../../types/ScrapEpisode'
import animeDb from '../../database/anime.db'
import episodeErrorDb from '../../database/episodeError.db'
import animesCache from '../../utils/animesCache'
import { updateAnilist } from './buildsProperties'
import findAnime from './findAnime'
import joinEpisodes from './joinEpisodes'
import sendNotifications from './pushNotifications'
import validatePages from './validatePages'

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
  const hasUpdatedAnilist = anime.lastUpdate !== timestampBefore
  const animeAndEpisodes = joinEpisodes({ anime, namePage, episodeScraper, defaultLang })

  if (!animeAndEpisodes && hasUpdatedAnilist) return false
  anime = animeAndEpisodes ?? anime
  if (!validatePages(anime)) return false
  if (animeAndEpisodes) {
    animesCache.set(anime.id)
    sendNotifications.setMissingUpdated(anime.id)
  } else {
    animesCache.setUpdated(true)
  }

  await animeDb.updateOne({ anime, filter: { id: anime.id } })
  return true
}
