import { AnimeList } from '../../../types'
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
    query = `{ "titleinPages.${namePage}":"${search}" }`
    titleInDataAnilist = [
      {
        'dataAnilist.title': { english: search },
      },
      {
        'dataAnilist.title': { romanji: search },
      },
      {
        'dataAnilist.title': { userPreferred: search },
      },
    ]
  }
  if (searchType === 'id') query = `{"dataAnilist.id": "${search} }`

  const queryParse = [JSON.parse(query), ...titleInDataAnilist]

  const anime = await animeModel.findOne({
    $or: queryParse,
  })
  return anime
}

export async function UpdateOneAnime(animeEdited: AnimeList) {
  const config = { upsert: true, returnDocument: 'after' }
  const filter = {
    'dataAnilist.id': animeEdited.dataAnilist.id,
  }

  const anime = await animeModel.findOneAndUpdate(filter, animeEdited, config)

  return anime
}
export async function findAll() {
  return await animeModel.find({})
}
export async function deletedOne(anilistId: number) {
  return await animeModel.deleteOne({ 'dataAnilist.id': anilistId })
}
