import { InfoEpisodeRecovered, QueryAnilist } from '../../../../types'
import { findIncidences, findIncidencesOverflowEpisode } from '../../database/anime.db'
import { EpisodeNumber } from '../../Enum'
import { queryAnilistForTitle } from './queryAnilist'

export async function findConcidencesInDatabase(resultScrapedForItem: InfoEpisodeRecovered, namePage: string) {
  resultScrapedForItem.title = resultScrapedForItem.title.replace(/["]/g, '')
  let queryAnilist: QueryAnilist | undefined

  let animeIncidence = await findIncidences(resultScrapedForItem.title, undefined, namePage)
  if (!animeIncidence) animeIncidence = await findIncidencesOverflowEpisode(namePage, resultScrapedForItem.title)
  if (!animeIncidence) queryAnilist = await queryAnilistForTitle(resultScrapedForItem.title)

  const mediaAnilist = queryAnilist?.data?.Media
  resultScrapedForItem.episode ||= mediaAnilist?.episodes || EpisodeNumber.lastEpisodeNotFound

  if (resultScrapedForItem.episode === EpisodeNumber.lastEpisodeNotFound) {
    return {
      error: { resultScrapedForItem, queryAnilist, animeIncidence },
      animeIncidence,
    }
  }
  const episodeAnilistwithoutNull = mediaAnilist?.episodes || NaN

  if (episodeAnilistwithoutNull < resultScrapedForItem.episode) {
    queryAnilist = undefined
  }
  if (animeIncidence?.lastEpisodesOfTempPreview) {
    resultScrapedForItem.episode -= episodeAnilistwithoutNull
  }
  if ((!mediaAnilist || !queryAnilist) && !animeIncidence) {
    return {
      error: { resultScrapedForItem, queryAnilist, animeIncidence },
      animeIncidence,
    }
  }
  if (!animeIncidence) animeIncidence = await findIncidences('', mediaAnilist!.id, namePage)

  let titleinPages = animeIncidence?.titleinPages || {}
  if (!animeIncidence?.titleinPages[`${namePage}-overflow`]) titleinPages[namePage] = resultScrapedForItem.title

  return {
    resultScrapedForItemModified: resultScrapedForItem,
    error: null,
    animeIncidence: {
      updateAnilist: animeIncidence?.updateAnilist || Date.now(),
      titleinPages,
      dataAnilist: animeIncidence?.dataAnilist || queryAnilist!.data!.Media!,
      episodes: animeIncidence?.episodes || {},
    },
  }
}
