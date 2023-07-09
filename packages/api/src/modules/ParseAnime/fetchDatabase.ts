import { Anime } from '../../../../types/Anime'
import { findOne } from '../../database/anime.db'
type Params = { namePage: string; search: string; searchType: 'id' | 'title' }
/**
 * Search by id or title and check redirectId exists.
 */
export async function fetchDatabase({ search, searchType, namePage }: Params) {
  let db
  if (searchType === 'title') db = await findOne({ search: search, namePage: namePage, searchType: 'title' })
  if (searchType === 'id') db = await findOne({ search: search, namePage: namePage, searchType: 'id' })
  if (!db) return null
  const redirectId = (db.pages[namePage] ?? {}).redirectId ?? null
  if (redirectId) db = await findOne({ search: `${redirectId}`, namePage: namePage, searchType: 'id' })
  return JSON.parse(JSON.stringify(db)) as Anime
}
