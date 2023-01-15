import { AnimeEdited } from '../types'
import { animeModel } from './models/anime.model'

export async function findIncidences(titleAnimeInPage = '', idInAnilist = NaN) {
  const anime = Number.isNaN(idInAnilist)
    ? await animeModel.findOne({
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
        ],
      })
    : await animeModel.findOne({
        'data.id': idInAnilist,
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
