import type { Anime, AnimeMinified } from '../../../../../types/Anime'
import cache from '../../../utils/cache'

let animesUpdatedCache: number = 0
let animesMinified: AnimeMinified[] = []

function minifyAnimes (animes: Anime[]): AnimeMinified[] {
  return animes.map(anime => {
    const namePages = Object.keys(anime.pages)
    let refEpidode = 0
    let lastUpdateOld = 0
    for (const name of namePages) {
      const { lastUpdate, episode } = anime.pages[name].episodes[0]
      const time = lastUpdateOld < lastUpdate
      if (time) {
        refEpidode = episode
        lastUpdateOld = lastUpdate
      }
      if (refEpidode === 0) {
        console.log('')
      }
    }
    return {
      lastUpdate: anime.lastUpdate,
      title: anime.dataAnilist.title.romaji,
      image: anime.dataAnilist.coverImage.large,
      id: anime.dataAnilist.id,
      episode: refEpidode,
      color: anime.dataAnilist.coverImage.color
    }
  })
}
export function getData () {
  const animes: Anime[] | null = cache.get('animes') ?? null
  const animesUpdated = cache.get('animesUpdated') ?? 0
  if (animes == null) return { animes, animesUpdated, animesMinified }
  if (animesUpdated > animesUpdatedCache) {
    animesMinified = minifyAnimes(animes)
    animesUpdatedCache = animesUpdated
  }
  return { animes, animesUpdated: animesUpdatedCache, animesMinified }
}
