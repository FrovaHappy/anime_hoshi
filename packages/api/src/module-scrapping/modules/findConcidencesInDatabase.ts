import { InfoEpisodeRecovered, QueryAnilist } from '../../../../types'
import { findIncidences } from '../../database/anime.db'
import { casesErrorsEpisode } from './casesErrorsEpisode'
import { queryAnilistForTitle } from './queryAnilist'

export async function findConcidencesInDatabase(resultScrapedForItem: InfoEpisodeRecovered, namePage: string) {
  let queryAnilist: QueryAnilist | undefined
  let animeIncidence = await findIncidences(resultScrapedForItem.title, undefined, namePage)
  if (!animeIncidence) queryAnilist = await queryAnilistForTitle(resultScrapedForItem.title)

  const mediaAnilist = queryAnilist?.data?.Media ?? animeIncidence?.dataAnilist
  if (!mediaAnilist) {
    return {
      resultScrapedForItemModified: resultScrapedForItem,
      error: {
        typeError: 'mediaAnilist Undefined',
        namePage,
        url: resultScrapedForItem.url,
        title: resultScrapedForItem.title,
        episode: resultScrapedForItem.episode,
      },
      animeIncidence,
    }
  }
  if (!animeIncidence) animeIncidence = await findIncidences('', mediaAnilist.id, namePage)
  const fivedaytomiliseconds = 432_000_000
  if (animeIncidence && Date.now() > animeIncidence.updateAnilist + fivedaytomiliseconds) {
    queryAnilist = await queryAnilistForTitle(animeIncidence.dataAnilist.title.romaji)
  }
  const { error, itemScraper } = casesErrorsEpisode(animeIncidence, mediaAnilist, resultScrapedForItem, namePage)
  if (error) {
    return {
      resultScrapedForItemModified: resultScrapedForItem,
      error: error,
      animeIncidence,
    }
  }
  resultScrapedForItem = itemScraper

  let titleinPages = animeIncidence?.titleinPages || {}
  if (!animeIncidence?.titleinPages[`${namePage}-fixed`]) titleinPages[namePage] = resultScrapedForItem.title

  return {
    resultScrapedForItemModified: resultScrapedForItem,
    error: null,
    animeIncidence: {
      updateAnilist: animeIncidence?.updateAnilist || Date.now(),
      titleinPages,
      dataAnilist: mediaAnilist,
      episodes: animeIncidence?.episodes || {},
    },
  }
}
