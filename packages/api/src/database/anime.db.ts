import { Anime } from '../../../types/Anime'
import { animeModel } from './models/anime.model'
type Params = {
  search: string
  searchType: 'id' | 'title'
  namePage: string
}
export async function findOne({ search, searchType, namePage }: Params) {
  let query = ''
  let titleInDataAnilist: any[] = []
  if (searchType === 'title') {
    query = `{ "pages.${namePage}.title":"${search}"}`
    titleInDataAnilist = [
      {
        'dataAnilist.title.userPreferred': search,
      },
      {
        'dataAnilist.title.romaji': search,
      },
      {
        'dataAnilist.title.english': search,
      },
    ]
  }
  if (searchType === 'id') query = `{"dataAnilist.id": "${search}" }`

  const querysParse = [JSON.parse(query), ...titleInDataAnilist]

  let anime
  for (const queryParse of querysParse) {
    anime = await animeModel.findOne(queryParse)
    if (anime) break
  }
  return anime
}

export async function updateOne({ anime, filter }: { anime: Anime; filter: object }) {
  const result = await animeModel.findOneAndUpdate(filter, anime, {
    upsert: true,
    returnDocument: 'after',
    overwrite: true,
    strict: true,
  })

  return result
}
export async function findAll() {
  return await animeModel.find({})
}
export async function deletedOne(anilistId: number) {
  return await animeModel.deleteOne({ 'dataAnilist.id': anilistId })
}
export default { findOne, updateOne }
