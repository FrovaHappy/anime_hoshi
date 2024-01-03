import { type Anime } from '../../../types/Anime'
import animeDb from '../database/anime.db'
import { copyDeepObject, mayorLastUpdate } from './general'

let animesIdsLocal: number[] = []
let animes: Anime[] = []
let updated = false

function get() {
  return { animesIds: animesIdsLocal, updated }
}
function set(id: number) {
  animesIdsLocal = [...new Set([id, ...animesIdsLocal])]
  updated = true
}
interface SetAll {
  animesIds?: number[]
}
function setAll({ animesIds }: SetAll) {
  if (animesIds) animesIdsLocal = animesIds
}
function setUpdated(update = true) {
  updated = update
}

async function refresh() {
  if (!updated) return animes
  animes = []
  const ids = [...animesIdsLocal].slice(0, 100)
  for await (const id of ids) {
    const anime = await animeDb.findOne({ search: id, searchType: 'id' })
    if (!anime) continue
    animes = [anime, ...animes]
  }
  return copyDeepObject(animes)
}
function getCache() {
  return copyDeepObject(animes)
}
async function init() {
  animes = await animeDb.findAll()
  animes = animes.sort((a, b) => mayorLastUpdate(b) - mayorLastUpdate(a))
  animesIdsLocal = animes.map(a => a.id).slice(0, 100)
  updated = false
}

export default { get, set, setAll, setUpdated, getCache, refresh, init }
