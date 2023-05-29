import { AnimeList, Episodes, EpisodesContent, InfoEpisodeRecovered, PagesUrlObject } from '../../../../types'
import { TimestampTimings } from '../../Enum'
type PagesUrl = { [x: string]: string | undefined } | PagesUrlObject
type HasUpdate = 'forNewEpisode' | 'forAnilistUpdated' | ''
function setEpisode(
  episodesOfAnimeList: Episodes,
  episodewithoutNaN: number,
  resultScrapedForItem: InfoEpisodeRecovered,
  namePage: string,
  needUpdate: boolean,
  hasUpdate: HasUpdate
) {
  const numberOfEpisode = episodewithoutNaN
  let episodes = episodesOfAnimeList
  let episode: EpisodesContent = episodes[numberOfEpisode] ?? ({} as EpisodesContent)
  let pagesUrl: PagesUrl = episode?.pagesUrl ?? {}
  if (pagesUrl[namePage]) return { episodes, needUpdate }
  if (Object.keys(pagesUrl).length === 0) episode.updateEpisode = Date.now()
  needUpdate = true
  hasUpdate = 'forNewEpisode'
  pagesUrl[namePage] = { url: resultScrapedForItem.url, update: Date.now() }
  episode.pagesUrl = pagesUrl
  episodes[numberOfEpisode] = episode
  return { episodes, needUpdate, hasUpdate }
}

export function formattingBeforeSaving(
  resultScrapedForItem: InfoEpisodeRecovered,
  animeIncidence: AnimeList,
  namePage: string
) {
  let animeEdited = animeIncidence
  let { episodes } = animeIncidence
  let needUpdate = false
  let hasUpdate: HasUpdate = ''

  const canDataAnilistUpdated = Date.now() > animeIncidence.updateAnilist + TimestampTimings.fiveDays
  if (canDataAnilistUpdated) {
    needUpdate = true
    hasUpdate = 'forAnilistUpdated'
    animeEdited.updateAnilist = Date.now()
  }

  const setEpisodesStatus = setEpisode(
    episodes,
    resultScrapedForItem.episode,
    resultScrapedForItem,
    namePage,
    needUpdate,
    hasUpdate
  )
  needUpdate = setEpisodesStatus.needUpdate
  animeEdited.episodes = { ...setEpisodesStatus.episodes }
  hasUpdate = setEpisodesStatus.hasUpdate ?? hasUpdate
  return { animeEdited, needUpdate, hasUpdate }
}
