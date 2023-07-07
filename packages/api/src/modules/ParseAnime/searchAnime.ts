import { TimestampTimings } from '../../Enum'
import fetchAnilist, { SearchOptions } from './fetchAnilist'
import { fetchDatabase } from './fetchDatabase'
type Params = { title: string; namePage: string }
async function searchAnime({ title, namePage }: Params) {
  let hasUpdated = false
  let database = await fetchDatabase({ search: title, namePage, searchType: 'title' })
  if (!database) {
    hasUpdated = true
    const dataAnilist = await fetchAnilist({ search: title, searchType: SearchOptions.forTitle })
    if (!dataAnilist) return null

    let newDatabase = await fetchDatabase({ search: `${dataAnilist.id}`, searchType: 'id', namePage })
    !newDatabase
      ? (newDatabase = { dataAnilist: dataAnilist, pages: {} } as any) // TODO: comprovar si hay problem
      : (newDatabase.dataAnilist = dataAnilist)

    database = newDatabase!
  }
  const id = database.dataAnilist.id
  const dataAnilistIsExpired = Date.now() > database.dataAnilist.lastUpdate + TimestampTimings.fiveDays
  if (dataAnilistIsExpired) {
    hasUpdated = true
    const newDataAnilist = await fetchAnilist({ search: `${id}`, searchType: SearchOptions.forId })
    if (newDataAnilist) database.dataAnilist = newDataAnilist
  }
  return { database, hasUpdated }
}

export default searchAnime
