import { type Anime } from '../../../../types/Anime'
import animeDb from '../../database/anime.db'
import fetchAnilist from '../../shared/fetchAnilist'

export interface Params {
  title: string
}

export default async function findAnime({ title }: Params): Promise<Anime | null> {
  let animeResult = (await animeDb.findOne({ search: title, searchType: 'title' }))?.toJSON()
  if (animeResult) return animeResult
  const dataAnilist = await fetchAnilist({ search: title, searchType: 'forTitle' })
  if (!dataAnilist) return null

  animeResult = (await animeDb.findOne({ search: dataAnilist.id, searchType: 'id' }))?.toJSON()

  return {
    ...dataAnilist,
    pages: animeResult?.pages ?? {},
    titles: [...new Set([...(animeResult?.titles ?? []), title])]
  }
}
