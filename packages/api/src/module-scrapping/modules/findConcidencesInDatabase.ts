import { InfoEpisodeRecovered, QueryAnilist } from '../../../../types'
import { findIncidences } from '../../database/anime.db'
import { queryAnilistForTitle } from './queryAnilist'

export async function findConcidencesInDatabase(resultScrapedForItem: InfoEpisodeRecovered, namePage: string) {
  let animeIncidence = await findIncidences(resultScrapedForItem.title, undefined, namePage)

  let queryAnilist: QueryAnilist | undefined

  if (!animeIncidence) queryAnilist = await queryAnilistForTitle(resultScrapedForItem.title)

  if ((!queryAnilist?.data?.Media && !animeIncidence) || (!queryAnilist && !animeIncidence)) {
    return {
      error: { at: resultScrapedForItem, detail: queryAnilist, animeIncidence },
      animeIncidence,
    }
  }
  if (!animeIncidence) animeIncidence = await findIncidences('', queryAnilist!.data!.Media.id, namePage)

  let titleinPages = animeIncidence?.titleinPages || {}
  titleinPages[namePage] = resultScrapedForItem.title

  return {
    animeIncidence: {
      updateAnilist: animeIncidence?.updateAnilist || Date.now(),
      titleinPages,
      dataAnilist: animeIncidence?.dataAnilist || queryAnilist!.data!.Media,
      episodes: animeIncidence?.episodes || {},
    },
  }
}
