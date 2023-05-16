import { InfoEpisodeRecovered, QueryAnilist } from '../../../../types'
import { TimestampTimings } from '../../Enum'
import { findIncidences } from '../../database/anime.db'
import Log from '../../shared/log'
import { casesErrorsEpisode } from './casesErrorsEpisode'
import { queryAnilistForTitle } from './queryAnilist'
type DataOfScraper = {
  scrapObject: InfoEpisodeRecovered
  namePage: string
}
async function getDatas({ scrapObject, namePage }: DataOfScraper) {
  let queryAnilist: QueryAnilist | undefined
  let canUpdate = false
  let animeInDB = await findIncidences(scrapObject.title, undefined, namePage)
  if (!Boolean(animeInDB)) queryAnilist = await queryAnilistForTitle(scrapObject.title)

  let dataAnilist = queryAnilist?.data?.Media ?? animeInDB?.dataAnilist
  if (!animeInDB && Boolean(dataAnilist)) animeInDB = await findIncidences('', dataAnilist!.id, namePage)

  if (Boolean(animeInDB?.updateAnilist)) {
    const canDataAnilistUpdated = Date.now() > animeInDB!.updateAnilist + TimestampTimings.fiveDays
    if (canDataAnilistUpdated) {
      queryAnilist = await queryAnilistForTitle(scrapObject.title)
      await Log({
        type: 'info',
        message: `[build Anime] dataAnilist of ID ${queryAnilist?.data?.Media?.id} was updated for time expired `,
        content: queryAnilist,
      })
    }
    dataAnilist = queryAnilist?.data?.Media ?? dataAnilist
    canUpdate = true
  }
  return { animeInDB, dataAnilist, canUpdate }
}

export async function findConcidencesInDatabase(resultScrapedForItem: InfoEpisodeRecovered, namePage: string) {
  const datas = await getDatas({ scrapObject: resultScrapedForItem, namePage: namePage })
  const { dataAnilist } = datas
  const animeIncidence = datas.animeInDB
  if (!dataAnilist) {
    return {
      resultScrapedForItemModified: resultScrapedForItem,
      error: {
        typeError: 'dataAnilist Undefined',
        namePage,
        url: resultScrapedForItem.url,
        title: resultScrapedForItem.title,
        episode: resultScrapedForItem.episode,
      },
      animeIncidence,
    }
  }
  const { error, itemScraper } = casesErrorsEpisode(animeIncidence, dataAnilist, resultScrapedForItem, namePage)
  if (error) {
    return {
      resultScrapedForItemModified: resultScrapedForItem,
      error: error,
      animeIncidence,
    }
  }
  resultScrapedForItem = itemScraper

  let titleinPages = animeIncidence?.titleinPages || {}
  if (!titleinPages[`${namePage}-fixed`]) titleinPages[namePage] = resultScrapedForItem.title
  const updateAnilist = animeIncidence?.updateAnilist || Date.now()
  const episodes = animeIncidence?.episodes || {}

  return {
    resultScrapedForItemModified: resultScrapedForItem,
    error: null,
    animeIncidence: {
      updateAnilist,
      titleinPages,
      dataAnilist,
      episodes,
    },
  }
}
