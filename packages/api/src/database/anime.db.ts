import type { Anime } from '../../../types/Anime'
import { animeModel } from './models/anime.model'
interface Params {
  search: string | number
  searchType: 'id' | 'title'
}
export async function findOne({ search, searchType }: Params) {
  search = `${search}`
  let query: Record<string, string> = { 'pages.titles': search }
  let titleInDataAnilist: Array<Record<string, string>> = []
  if (searchType === 'title') {
    titleInDataAnilist = [
      {
        'title.userPreferred': search
      },
      {
        'title.romaji': search
      },
      {
        'title.english': search
      }
    ]
  }
  if (searchType === 'id') query = { id: search }

  const queryParses = [query, ...titleInDataAnilist]

  let anime
  for (const queryParse of queryParses) {
    anime = await animeModel.findOne(queryParse)
    if (anime != null) break
  }
  return anime
}
interface UpdateOne {
  anime: Anime
  filter: Partial<Anime>
}
export async function updateOne({ anime, filter }: UpdateOne) {
  const result = await animeModel.findOneAndReplace(filter, anime, {
    upsert: true,
    returnDocument: 'after',
    overwrite: true,
    strict: true
  })

  return result
}
export async function findAll() {
  return await animeModel.find({})
}
export async function deletedOne(anilistId: number) {
  return await animeModel.deleteOne({ 'dataAnilist.id': anilistId })
}
export default { findOne, updateOne, deletedOne, findAll }
