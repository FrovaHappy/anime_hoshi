import cache from '../utils/cache'
import { CacheKeys } from '../Enum'
import { AnimeList } from '../../../types'

export async function getAnimeListServices() {
  const animeList: AnimeList[] | null = cache.get(CacheKeys.animeList) ?? null
  const animesUpdated: number = cache.get(CacheKeys.animesUpdatedTime) ?? NaN
  return { animeList, animesUpdated }
}
