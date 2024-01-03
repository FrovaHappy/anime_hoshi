import { type Anime } from '../../../../types/Anime'

export default function validatePages(anime: Anime) {
  if (!anime.pages) return false
  const namePages = Object.keys(anime.pages)
  if (namePages.length === 0) return false
  for (const namePage of namePages) {
    const page = anime.pages[namePage]
    if (!page) return false
    if (!page.episodes) return false
    if (page.episodes.length === 0) return false
  }
  return true
}
