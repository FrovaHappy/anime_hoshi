import { AnimeList } from '../../../types'
import cache from './cache'
import { findIncidences } from '../database/anime.db'
import { CacheKeys } from '../Enum'
async function animeList(animespublished: number[], needUpdateArray: AnimeList[]) {
  const animeCache = cache.get(CacheKeys.animeList) as AnimeList[] | undefined
  if (needUpdateArray.length != 0 || !animeCache) {
    console.log('\nrefresh cache: ' + CacheKeys.animeList)
    let animeList: AnimeList[] = []
    for (const id of animespublished) {
      const anime = await findIncidences(undefined, id)
      if (anime) animeList.push(anime.toJSON())
    }
    cache.set(CacheKeys.animeList, animeList)
  }
}

export default {
  animeList,
}
