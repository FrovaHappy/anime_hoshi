import { InfoEpisodeRecovered, QueryAnilist } from '../../../../types'
import { findIncidences } from '../../database/anime.db'
import { queryAnilistForTitle } from './queryAnilist'

export async function findConcidencesInDatabase(resultScrapedForItem: InfoEpisodeRecovered) {
  let animeIncidence = await findIncidences(resultScrapedForItem.title)
  let queryAnilist: QueryAnilist | undefined

  if (!animeIncidence) queryAnilist = await queryAnilistForTitle(resultScrapedForItem.title)

  if ((!queryAnilist?.data?.Media && !animeIncidence) || (!queryAnilist && !animeIncidence)) {
    return {
      error: { at: resultScrapedForItem, detail: queryAnilist, animeIncidence },
      animeIncidence,
    }
  }
  if (!animeIncidence) animeIncidence = await findIncidences('', queryAnilist!.data!.Media.id)
  return {
    animeIncidence: {
      data: animeIncidence?.data ? animeIncidence.data : queryAnilist!.data!.Media,
      pages: animeIncidence?.pages ? animeIncidence.pages : [],
    },
  }
}
