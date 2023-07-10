import { InfoEpisodeRecovered, PagesAttacked } from '../../../../types'
import searchAnime from './searchAnime'
import compareEpisodes from './compareEpisodes'
import animeDB from '../../database/anime.db'
import Log from '../../shared/log'
function errors(err: any, type: 'search Database Error' | 'episode Null Error') {
  return {
    type,
    content: err,
  }
}
async function validateData({ namePage, animesScrap }: { namePage: string; animesScrap: InfoEpisodeRecovered[] }) {
  let totalAnimesUpdated = 0
  let totalAnilistUpdated = 0
  let totalErrors = 0
  for (const animeScrap of animesScrap) {
    if (isNaN(animeScrap.episode)) {
      errors(animeScrap, 'episode Null Error')
      totalErrors += 1
      continue
    }
    const animeSearch = await searchAnime({ title: animeScrap.title, namePage })
    if (!animeSearch) {
      errors(animeScrap, 'search Database Error')
      totalErrors += 1
      continue
    }
    const anime = await compareEpisodes({ database: animeSearch.database, episodeSrap: animeScrap, namePage })

    if (animeSearch.hasUpdated || anime.hasUpdated) {
      animeSearch.hasUpdated ? (totalAnilistUpdated += 1) : (totalAnimesUpdated += 1)
      await animeDB.updateOne({ anime: anime.database, filter: { 'dataAnilist.id': anime.database.dataAnilist.id } })
    }
  }
  return {
    totalAnilistUpdated,
    totalAnimesUpdated,
    totalErrors,
  }
}

export default async function index(pagesAttacked: PagesAttacked) {
  for (let pageScrap of pagesAttacked) {
    const namePage = Object.keys(pageScrap)[0]
    const animesScrap = pageScrap[namePage]
    const result = await validateData({ namePage, animesScrap })
    Log({
      content: result,
      message: `[Anime Save] result of ${namePage}: ${result.totalAnilistUpdated}uA/  ${result.totalAnimesUpdated}uE/ ${result.totalErrors}E / ${animesScrap.length} `,
      type: result.totalErrors > 0 ? 'error' : 'info',
    })
  }
  console.log('finished')
}
