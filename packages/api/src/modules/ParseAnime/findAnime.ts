import { type OperationType } from '../../../../types'
import { type Anime } from '../../../../types/Anime'
import { type LangSupport } from '../../../../types/ScrapEpisode'
import animeDb from '../../database/anime.db'
import fetchAnilist from '../../shared/fetchAnilist'

export interface Params {
  title: string
  namePage: string
  lang: LangSupport
  defaultLang: LangSupport
}
interface Return {
  operationType: OperationType
  anime: Anime
}
export const enum OperationTypeEnum {
  ORIGINAL = 'ORIGINAL',
  EDIT = 'EDIT',
  NEW = 'NEW'
}
export default async function findAnime({ namePage, title }: Params): Promise<Return | null> {
  let animeResult = (await animeDb.findOne({ namePage, search: title, searchType: 'title' }))?.toJSON()
  if (animeResult) return { anime: animeResult, operationType: OperationTypeEnum.ORIGINAL }

  const dataAnilist = await fetchAnilist({ search: title, searchType: 'forTitle' })
  if (!dataAnilist) return null

  // search in database for id
  animeResult = (await animeDb.findOne({ search: dataAnilist.id, namePage, searchType: 'id' }))?.toJSON()

  // operation for anime NEW
  if (!animeResult) {
    const anime: Anime = {
      dataAnilist,
      lastUpdate: Date.now(),
      pages: {
        [namePage]: {
          episodes: [],
          lastUpdate: 0,
          redirectId: null,
          startCount: 0,
          title
        }
      }
    }
    return { anime, operationType: 'NEW' }
  }

  return null
}
