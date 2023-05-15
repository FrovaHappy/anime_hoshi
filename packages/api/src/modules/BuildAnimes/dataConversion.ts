import { UpdateOneAnime } from '../../database/anime.db'
import { findAnimePublished, updatedAnimesPublished } from '../../database/animePublished'
import { AnimeList, InfoEpisodeRecovered } from '../../../../types'
import { formattingBeforeSaving } from './formattingBeforeSaving'
import { findConcidencesInDatabase } from './findConcidencesInDatabase'
import { formartItemScraper } from './fomartItemScraper'
import { PagesScraped } from '../../../type'
import log from '../../shared/log'

export async function setAnime(allResultScraped: PagesScraped) {
  console.log('\nstart Restructure Anime Data ... ')
  let errors = []
  let animespublished: number[] = (await findAnimePublished())?.[0]?.animePublished || []
  let animeUpdated: AnimeList[] = []

  for (const resultScrapedForPage of allResultScraped) {
    const namePage = Object.keys(resultScrapedForPage)[0]
    const resultPageArray: InfoEpisodeRecovered[] = (resultScrapedForPage as any)[namePage]
    let updated = 0

    for (let resultScrapedForItem of resultPageArray) {
      resultScrapedForItem = formartItemScraper(resultScrapedForItem)
      let { animeIncidence, error } = await findConcidencesInDatabase(resultScrapedForItem, namePage)
      if (error) {
        errors.push(error)
        continue
      }
      const { animeEdited, needUpdate } = formattingBeforeSaving(resultScrapedForItem, animeIncidence!, namePage)
      if (needUpdate) {
        const animeSave = (await UpdateOneAnime(animeEdited))!
        updated++
        animespublished = animespublished
          .filter((id) => !(id === animeSave.dataAnilist.id))
          .concat(animeSave.dataAnilist.id)
        animeUpdated = animeUpdated
          .filter((anime) => !(anime.dataAnilist.id === animeSave.dataAnilist.id))
          .concat(animeSave)
        await updatedAnimesPublished(animespublished)
      }
    }
    console.log(`${namePage} - updated: ${updated}/${resultPageArray.length}`)
  }
  await log({
    type: 'warning',
    message: `[build Anime] ${errors.length} animes with problems`,
    content: errors,
  })
  return {
    errors,
    animeUpdated,
    animespublished,
  }
}
