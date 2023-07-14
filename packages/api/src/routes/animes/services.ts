import { Anime } from '../../../../types/Anime'
import { TimestampTimings } from '../../Enum'
import cache from '../../utils/cache'
export type AnimeMinified = {
  lastUpdate: number
  title: string
  image: string
  id: number
}
let animesUpdatedCache: number = 0
let animesMinified: AnimeMinified[] = []

function minifyAnimes(animes: Anime[]) {
  return animes.map((anime) => {
    const namePages = Object.keys(anime.pages)
    let refEpidode = 0
    for (const name of namePages) {
      const { lastUpdate, episode } = anime.pages[name].episodes[0]
      if (Date.now() < lastUpdate + TimestampTimings.eightHours) {
        refEpidode = episode
      }
    }
    return {
      lastUpdate: anime.lastUpdate,
      title: anime.dataAnilist.title.romaji,
      image: anime.dataAnilist.coverImage.large,
      id: anime.dataAnilist.id,
      episode: refEpidode,
    }
  })
}
export function getData() {
  const animes: Anime[] | null = cache.get('animes') ?? null
  const animesUpdated = cache.get('animesUpdated') ?? 0
  if (!animes) return { animes, animesUpdated, animesMinified }
  if (animesUpdated > animesUpdatedCache) {
    animesMinified = minifyAnimes(animes)
    animesUpdatedCache = animesUpdated
  }
  return { animes, animesUpdated: animesUpdatedCache, animesMinified }
}
