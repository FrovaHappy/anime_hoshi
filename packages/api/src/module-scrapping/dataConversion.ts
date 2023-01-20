import { findAndUpdateAnime } from '../database/anime.db'
import { findAnimePublished, updatedAnimesPublished } from '../database/animePublished'
import { startScrapping } from './scrapping/main'
import { InfoEpisodeRecovered } from '../../../types'
import refreshCache from './modules/refreshCache'
import { formattingBeforeSaving } from './modules/formattingBeforeSaving'
import { findConcidencesInDatabase } from './modules/findConcidencesInDatabase'

export async function setAnime() {
  console.log('start conversion ...')
  const allResultScraped = await startScrapping()
  let errors = []
  let animespublished: number[] = (await findAnimePublished())?.[0]?.animePublished || []
  let needUpdateArray: number[] = []

  for (const resultScrapedForPage of allResultScraped) {
    const namePage = Object.keys(resultScrapedForPage)[0]
    const resultPageArray: InfoEpisodeRecovered[] = (resultScrapedForPage as any)[namePage]
    console.log(namePage)
    let updated = 0

    for (const resultScrapedForItem of resultPageArray) {
      let { animeIncidence, error } = await findConcidencesInDatabase(resultScrapedForItem, namePage)
      if (error) {
        errors.push(error)
        continue
      }
      const { animeEdited, needUpdate, episodeisNull } = formattingBeforeSaving(
        resultScrapedForItem,
        animeIncidence!,
        namePage
      )
      if (episodeisNull) {
        errors.push(episodeisNull)
        continue
      }
      if (needUpdate) {
        const animeEditedSave = await findAndUpdateAnime(animeEdited)
        updated++
        animespublished = animespublished
          .filter((id) => !(id === animeEdited.dataAnilist.id))
          .concat(animeEdited.dataAnilist.id)
        needUpdateArray = needUpdateArray
          .filter((id) => !(id === animeEdited.dataAnilist.id))
          .concat(animeEdited.dataAnilist.id)
        await updatedAnimesPublished(animespublished)
        console.log('  updated anime: ' + animeEditedSave?.dataAnilist.title.romaji + ' on page ' + namePage)
      }
    }
    console.log('  total: ' + resultPageArray.length)
    console.log('  updated: ' + updated)
  }
  await refreshCache.animeList(animespublished, needUpdateArray)
  console.log('\nerrors: ' + JSON.stringify(errors.map((err) => err.at.title)))
}
