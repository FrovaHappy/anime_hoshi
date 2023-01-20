import { AnimeList } from '../../../../types'
import { cache } from '../../config'
import { findIncidences } from '../../database/anime.db'
import { CacheKeys } from '../../Enum'
async function animeList(animespublished: number[], needUpdateArray: number[]) {
  cache.mset([
    { key: CacheKeys.animePublished, val: animespublished },
    { key: CacheKeys.animeUpdated, val: needUpdateArray },
  ])
  const animePublished = cache.get(CacheKeys.animePublished) as number[]
  const animeUpdated = cache.get(CacheKeys.animeUpdated) as number[]
  const animeList = cache.get(CacheKeys.animeList) as number[] | undefined

  if (animeUpdated.length != 0 || !animeList) {
    console.log('  refresh cache: ' + CacheKeys.animeList)
    let animeList: AnimeList[] = []
    for (const id of animePublished) {
      const anime = await findIncidences(undefined, id)
      if (anime) animeList.push(anime.toJSON())
    }
    cache.set(CacheKeys.animeList, animeList)
  }
}

export default {
  animeList,
}
