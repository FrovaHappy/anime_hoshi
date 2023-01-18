import { AnimeEdited, InfoEpisodeRecovered } from '../../../../types'
import { EpisodeNumber } from '../../Enum'

export function formattingBeforeSaving(
  resultScrapedForItem: InfoEpisodeRecovered,
  animeIncidence: AnimeEdited,
  namePage: string
) {
  let animeEdited: AnimeEdited
  let Media = animeIncidence.data
  let needUpdate = false
  const episodewithoutNaN =
    (Number.isNaN(resultScrapedForItem.episode) ? Media.episodes : resultScrapedForItem.episode) ||
    EpisodeNumber.Invalid
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
  if (episodewithoutNaN === EpisodeNumber.Invalid) {
    console.log('Episode is Null value, status: ' + Media.status)
    return { animeEdited, needUpdate, episodeisNull: { at: resultScrapedForItem } }
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
