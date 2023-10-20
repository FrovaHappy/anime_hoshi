import animeDb from '../../database/anime.db'
import animePublished from '../../database/animePublished'
import cache from '../../utils/cache'

export async function setCacheAnime (animesId: number[], hasUpdated: boolean) {
  const cacheAnimesPublished = cache.get('animesPublished')
  if (!cacheAnimesPublished || hasUpdated) {
    cache.set('animesPublished', animesId)
    cache.set('animesUpdated', Date.now())
    const colectionsAnimes: any[] = []
    for (const animeId of animesId) {
      const query = await animeDb.findOne({ search: `${animeId}`, searchType: 'id', namePage: '' })
      if (query != null) colectionsAnimes.push(query.toJSON())
      await animePublished.updateAll(animesId)
    }
    cache.set('animes', colectionsAnimes)
  }
}

let totalAnimes: number[]

export async function BuildRefreshCacheAnimes () {
  totalAnimes = (await animePublished.findAll()) ?? []
  return {
    set (animesId: number[]) {
      totalAnimes = totalAnimes.filter(id => {
        return !animesId.some(v => v === id)
      }) // delete id old
      totalAnimes = [...new Set([...animesId, ...totalAnimes])]
      totalAnimes = totalAnimes.slice(0, 80)
      return totalAnimes
    },
    get () {
      return totalAnimes
    },
    async runUpdate (hasUpdated: boolean) {
      await setCacheAnime(totalAnimes, hasUpdated)
    }
  }
}
