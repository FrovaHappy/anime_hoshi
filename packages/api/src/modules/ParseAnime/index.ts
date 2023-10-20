import { type InfoEpisodeRecovered, type PagesAttacked } from '../../../../types'
import searchAnime from './searchAnime'
import compareEpisodes from './compareEpisodes'
import animeDB from '../../database/anime.db'
import Log from '../../shared/log'
import { BuildRefreshCacheAnimes } from './setChacheAnime'
import sendNotifications from './pushNotifications'

function errors (err: any, type: 'search Database Error' | 'episode Null Error') {
  return {
    type,
    content: err
  }
}
async function validateData ({ namePage, animesScrap }: { namePage: string, animesScrap: InfoEpisodeRecovered[] }) {
  let totalAnimesUpdated = 0
  let totalAnilistUpdated = 0
  let animesUpdated: number[] = []
  let totalErrors = 0
  for (const animeScrap of animesScrap) {
    if (isNaN(animeScrap.episode)) {
      errors(animeScrap, 'episode Null Error')
      totalErrors += 1
      continue
    }
    const animeSearch = await searchAnime({ title: animeScrap.title, namePage })
    if (animeSearch == null) {
      errors(animeScrap, 'search Database Error')
      totalErrors += 1
      continue
    }
    const anime = await compareEpisodes({ database: animeSearch.database, episodeSrap: animeScrap, namePage })

    if (animeSearch.hasUpdated || anime.hasUpdated) {
      if (animeSearch.hasUpdated) totalAnilistUpdated += 1
      if (anime.hasUpdated) {
        totalAnimesUpdated += 1
        animesUpdated = [anime.database.dataAnilist.id, ...animesUpdated]
      }
      await animeDB.updateOne({ anime: anime.database, filter: { 'dataAnilist.id': anime.database.dataAnilist.id } })
    }
  }
  return {
    totalAnilistUpdated,
    totalAnimesUpdated,
    totalErrors,
    animesUpdated
  }
}

export default async function index (pagesAttacked: PagesAttacked) {
  const refreshCacheAnime = await BuildRefreshCacheAnimes()
  const notifications = sendNotifications()
  let hasUpdated = false
  for (const pageScrap of pagesAttacked) {
    const namePage = Object.keys(pageScrap)[0]
    const animesScrap = pageScrap[namePage]
    const result = await validateData({ namePage, animesScrap })
    if (result.totalAnimesUpdated > 0) {
      hasUpdated = true
      refreshCacheAnime.set(result.animesUpdated)
      notifications.setAnimesUpdated(result.animesUpdated)
    }
    if (result.totalAnilistUpdated > 0) hasUpdated = true
    await Log({
      content: result,
      message: `[Anime Save] result of ${namePage}: ${result.totalAnilistUpdated}uA/  ${result.totalAnimesUpdated}uE/ ${result.totalErrors}E / ${animesScrap.length} `,
      type: result.totalErrors > 0 ? 'error' : 'info'
    })
  }
  await refreshCacheAnime.runUpdate(hasUpdated)
  await notifications.run()
  console.log('finished')
}
