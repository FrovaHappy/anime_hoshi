import { IdStatus } from '../Enum'
import { AnimeEdited } from '../../../types'
import { animeModel } from './models/anime.model'

export async function findIncidences(titleAnimeInPage = '', idInAnilist = IdStatus.emty) {
  const anime = await animeModel.findOne({
    $or: [
      {
        'data.title': { english: titleAnimeInPage },
      },
      {
        'data.title': { romanji: titleAnimeInPage },
      },
      {
        pages: {
          $elemMatch: {
            title: titleAnimeInPage,
          },
        },
      },
      {
        'data.id': idInAnilist,
      },
    ],
  })
  return anime
}

export async function findAndUpdateAnime(animeEdited: AnimeEdited) {
  const config = { upsert: true, returnDocument: 'after' }
  const filter = {
    'data.id': animeEdited.data.id,
  }
  const anime = await animeModel.findOneAndReplace(filter, animeEdited, config)
  return anime
}
