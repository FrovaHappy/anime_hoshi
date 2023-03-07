import cache from '../utils/cache'
import { CacheKeys } from '../Enum'

export async function getAnimeListServices() {
  const animeList = cache.get(CacheKeys.animeList) ?? []
  return animeList
}
