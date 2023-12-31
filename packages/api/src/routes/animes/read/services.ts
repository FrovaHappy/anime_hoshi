import type { Anime, AnimeMinified } from '../../../../../types/Anime'
import animesCache from '../../../utils/animesCache'
import animeMinified from './animeMinified'

let lastUpdate = 0
let animesMinifiedCache: AnimeMinified[] = []
export function getAnimesMinified() {
  const animes: Anime[] = animesCache.getCache()
  lastUpdate = animesCache.get().updated ? Date.now() : lastUpdate
  animesMinifiedCache = animes.map(anime => animeMinified(anime))
  console.log(animesMinifiedCache)
  return {
    lastUpdate,
    animesMinified: animesMinifiedCache
  }
}
