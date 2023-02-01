import { cache } from '../config'

export async function getAnimeListServices() {
  const animeList = cache.get('animeList') ?? []
  return animeList
}
