import { AnimeList, Episodes, EpisodesContent, InfoEpisodeRecovered, PagesUrlObject } from '../../../../types'
type PagesUrl = { [x: string]: string | undefined } | PagesUrlObject
function setEpisode(
  episodesOfAnimeList: Episodes,
  episodewithoutNaN: number,
  resultScrapedForItem: InfoEpisodeRecovered,
  namePage: string,
  needUpdate: boolean
) {
  const numberOfEpisode = episodewithoutNaN
  let episodes = episodesOfAnimeList
  let episode: EpisodesContent = episodes[numberOfEpisode] ?? ({} as EpisodesContent)
  let pagesUrl: PagesUrl = episode?.pagesUrl ?? {}
  if (pagesUrl[namePage]) return { episodes, needUpdate }
  if (Object.keys(pagesUrl).length === 0) episode.updateEpisode = Date.now()
  needUpdate = true
  pagesUrl[namePage] = { url: resultScrapedForItem.url, update: Date.now() }
  episode.pagesUrl = pagesUrl
  episodes[numberOfEpisode] = episode
  console.log({ episodes })
  return { episodes, needUpdate }
}

export function formattingBeforeSaving(
  resultScrapedForItem: InfoEpisodeRecovered,
  animeIncidence: AnimeList,
  namePage: string
) {
  let animeEdited = animeIncidence
  let { episodes } = animeIncidence
  let needUpdate = false
  const fivedaytomiliseconds = 432_000_000
  if (Date.now() > animeIncidence.updateAnilist + fivedaytomiliseconds) {
    console.log('Anilist updated for time expired')
    needUpdate = true
    animeEdited.updateAnilist = Date.now()
  }

  const setEpisodesStatus = setEpisode(
    episodes,
    resultScrapedForItem.episode,
    resultScrapedForItem,
    namePage,
    needUpdate
  )
  needUpdate = setEpisodesStatus.needUpdate
  animeEdited.episodes = { ...setEpisodesStatus.episodes }

  return { animeEdited, needUpdate }
}
