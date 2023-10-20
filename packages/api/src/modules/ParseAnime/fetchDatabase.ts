import { type Anime } from '../../../../types/Anime'
import { findOne } from '../../database/anime.db'
interface Params {
  namePage: string
  search: string
  searchType: 'id' | 'title'
}
/**
 * Search by id or title and check redirectId exists.
 */
export async function fetchDatabase ({ search, searchType, namePage }: Params) {
  let db
  if (searchType === 'title') db = await findOne({ search, namePage, searchType: 'title' })
  if (searchType === 'id') db = await findOne({ search, namePage, searchType: 'id' })
  if (db == null) return null
  db.pages = db.pages ?? {}
  const redirectId = db.pages[namePage]?.redirectId ?? null
  if (redirectId) db = await findOne({ search: `${redirectId}`, namePage, searchType: 'id' })
  db = JSON.parse(JSON.stringify(db)) as Anime
  db.pages = db.pages ?? {}
  return db
}
