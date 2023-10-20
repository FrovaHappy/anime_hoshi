import { TimestampTimings } from '../../Enum'
import fetchAnilist, { SearchOptions } from '../../shared/fetchAnilist'
import { fetchDatabase } from './fetchDatabase'
interface Params {
  title: string
  namePage: string
}
async function searchAnime ({ title, namePage }: Params) {
  let hasUpdated = false
  let database = await fetchDatabase({ search: title, namePage, searchType: 'title' })
  if (database == null) {
    hasUpdated = true
    const dataAnilist = await fetchAnilist({ search: title, searchType: SearchOptions.forTitle })
    if (dataAnilist == null) return null

    let newDatabase = await fetchDatabase({ search: `${dataAnilist.id}`, searchType: 'id', namePage })
    ;(newDatabase == null)
      ? (newDatabase = { dataAnilist, pages: {}, lastUpdate: Date.now() }) // TODO: comprovar si hay problem
      : (newDatabase.dataAnilist = dataAnilist)

    database = newDatabase
  }
  if (!database.pages[namePage]) {
    const pages = {
      [namePage]: {
        episodes: [],
        lastUpdate: Date.now(),
        redirectId: null,
        startCount: 0,
        title
      }
    }
    database.pages = { ...pages, ...database.pages }
  }
  const id = database.dataAnilist.id
  const dataAnilistIsExpired = Date.now() > database.dataAnilist.lastUpdate + TimestampTimings.fiveDays
  if (dataAnilistIsExpired) {
    hasUpdated = true
    const newDataAnilist = await fetchAnilist({ search: id, searchType: SearchOptions.forId })
    if (newDataAnilist != null) database.dataAnilist = newDataAnilist
  }
  return { database, hasUpdated }
}

export default searchAnime
