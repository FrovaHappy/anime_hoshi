import { InfoEpisodeRecovered, PagesAttacked } from '../../../../types'
import searchAnime from './searchAnime'
import compareEpisodes from './compareEpisodes'
import animeDB from '../../database/anime.db'

async function validateData({ namePage, animesScrap }: { namePage: string; animesScrap: InfoEpisodeRecovered[] }) {
  for (const animeScrap of animesScrap) {
    const animeSearch = await searchAnime({ title: animeScrap.title, namePage })
    if (!animeSearch) continue //TODO: manejar la exepcion
    const anime = await compareEpisodes({ database: animeSearch.database, episodeSrap: animeScrap, namePage })

    if (animeSearch.hasUpdated || anime.hasUpdated) {
      await animeDB.updateOne({ anime: anime.database, filter: { 'dataAnilist.id': anime.database.dataAnilist.id } })
    }
  }
}

export default async function index(pagesAttacked: PagesAttacked) {
  for (let pageScrap of pagesAttacked) {
    const namePage = Object.keys(pageScrap)[0]
    const animesScrap = pageScrap[namePage]
    await validateData({ namePage, animesScrap })
  }
  console.log('finished')
}
