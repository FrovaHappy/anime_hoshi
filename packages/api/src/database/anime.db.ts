import { IdStatus } from '../Enum'
import { AnimeList } from '../../../types'
import { animeModel } from './models/anime.model'

export async function findIncidences(titleAnimeInPage = '', idInAnilist = IdStatus.emty, namePage = '') {
  const titleinPageString = `{ "titleinPages.${namePage}":"${titleAnimeInPage}" }`
  const titleinPage = JSON.parse(titleinPageString)
  const anime = await animeModel.findOne({
    $or: [
      {
        'dataAnilist.title': { english: titleAnimeInPage },
      },
      {
        'dataAnilist.title': { romanji: titleAnimeInPage },
      },
      {
        'dataAnilist.title': { userPreferred: titleAnimeInPage },
      },
      titleinPage,
      {
        'dataAnilist.id': idInAnilist,
      },
    ],
  })
  return anime
}

export async function findAndUpdateAnime(animeEdited: AnimeList) {
  const config = { upsert: true, returnDocument: 'after' }
  const filter = {
    'dataAnilist.id': animeEdited.dataAnilist.id,
  }

  const anime = await animeModel.findOneAndReplace(filter, animeEdited, config)

  return anime
}

