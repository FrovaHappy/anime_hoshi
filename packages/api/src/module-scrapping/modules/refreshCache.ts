import { AnimeList } from '../../../../types'
import cache from '../../utils/cache'
import { findIncidences } from '../../database/anime.db'
import { CacheKeys } from '../../Enum'
async function animeList(animespublished: number[], needUpdateArray: number[]) {
  const animeList = cache.get(CacheKeys.animeList) as number[] | undefined

  if (needUpdateArray.length != 0 || !animeList) {
    console.log('  refresh cache: ' + CacheKeys.animeList)
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
