import { type Anime } from '../../../types/Anime'

export function copyDeepObject<T>(obj: T) {
  return JSON.parse(JSON.stringify(obj)) as T
}
export function mayorLastUpdate(a: Anime) {
  let lastUpdate = 0
  const namePages = Object.keys(a.pages)
  namePages.forEach(namePage => {
    const page = a.pages[namePage]
    if (lastUpdate < page.lastUpdate) lastUpdate = page.lastUpdate
  })
  return lastUpdate
}
