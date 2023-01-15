import { findAndUpdateAnime, findIncidences } from '../database/anime.db'
import { findAnimePublished, updatedAnimesPublished } from '../database/animePublished'
import { queryAnilistForTitle } from './queryAnilist'
import { startScrapping } from './scrapping/main'
import { AnimeEdited, InfoEpisodeRecovered, QueryAnilist } from './types'

async function findConcidencesInDatabase(resultScrapedForItem: InfoEpisodeRecovered) {
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

function agregateAnime(resultScrapedForItem: InfoEpisodeRecovered, animeIncidence: AnimeEdited, namePage: string) {
  let animeEdited: AnimeEdited
  let Media = animeIncidence.data
  let needUpdate = false
  const episodewithoutNaN =
    (Number.isNaN(resultScrapedForItem.episode) ? Media.episodes : resultScrapedForItem.episode) || -1
  const newPage = {
    nameOfPage: namePage,
    title: resultScrapedForItem.title,
    episodes: [
      {
        url: resultScrapedForItem.url,
        episode: episodewithoutNaN,
      },
    ],
  }
  animeEdited = {
    data: animeIncidence.data,
    pages: animeIncidence.pages,
  }
  const page = animeEdited.pages.find((p) => p.nameOfPage === namePage)
  const episode = page?.episodes.find((e) => e.episode === episodewithoutNaN)
  if (page) {
    animeEdited.pages = animeEdited.pages.map((p) => {
      if (p.nameOfPage === namePage && !episode) {
        needUpdate = true
        p.episodes.push({
          url: resultScrapedForItem.url,
          episode: episodewithoutNaN,
        })
      }
      return p
    })
  }
  if (!page) {
    needUpdate = true
    animeEdited.pages.push(newPage)
  }

  return { animeEdited, needUpdate }
}

export async function setAnime() {
  console.log('start conversion ...')
  const allResultScraped = await startScrapping()
  let errors = []
  let animespublished: number[] = (await findAnimePublished())?.[0]?.animePublished || []

  for (const resultScrapedForPage of allResultScraped) {
    const namePage = Object.keys(resultScrapedForPage)[0]
    const resultPageArray: InfoEpisodeRecovered[] = (resultScrapedForPage as any)[namePage]
    console.log(namePage)
    let updated = 0

    for (const resultScrapedForItem of resultPageArray) {
      let { animeIncidence, error } = await findConcidencesInDatabase(resultScrapedForItem)
      if (error) {
        errors.push(error)
        continue
      }
      const { animeEdited, needUpdate } = agregateAnime(resultScrapedForItem, animeIncidence!, namePage)
      const animeEditedSave = needUpdate ? await findAndUpdateAnime(animeEdited) : undefined
      if (needUpdate) {
        updated++
        animespublished = animespublished.filter((id) => !(id === animeEdited.data.id)).concat(animeEdited.data.id)
        await updatedAnimesPublished(animespublished)
        console.log('  updated anime: ' + animeEditedSave?.data.title.romaji + ' on page ' + namePage)
      }
    }
    console.log('  total: ' + resultPageArray.length)
    console.log('  updated: ' + updated)
  }
  console.log('anime published: ' + animespublished)
  console.log('\nerrors: ' + JSON.stringify(errors))
}
