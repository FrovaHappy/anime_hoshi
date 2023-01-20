import { AnimeList, Episodes, InfoEpisodeRecovered } from '../../../../types'
import { EpisodeNumber } from '../../Enum'

function setEpisode(
  episodesOfAnimeList: Episodes,
  episodewithoutNaN: number,
  resultScrapedForItem: InfoEpisodeRecovered,
  namePage: string
) {
  const numberOfEpisode = episodewithoutNaN.toString()
  let needUpdate = false
  let episodes = episodesOfAnimeList

  if (episodes[numberOfEpisode]) {
    let episode = episodes[numberOfEpisode]!

    const oldPageUrl = episode.pagesUrl[namePage]
    if (!oldPageUrl) {
      needUpdate = true
      ;(episode.pagesUrl[namePage] = resultScrapedForItem.url), (episode.updateEpisode = Date.now())
      episodes[numberOfEpisode] = episode
    }
  } else {
    needUpdate = true
    let pageUrl = {
      [namePage]: resultScrapedForItem.url,
    }

    let newEpisode = {
      [numberOfEpisode]: {
        updateEpisode: Date.now(),
        pagesUrl: pageUrl,
      },
    }
    episodes = { ...newEpisode }
  }
  return { episodes, needUpdate }
}

export function formattingBeforeSaving(
  resultScrapedForItem: InfoEpisodeRecovered,
  animeIncidence: AnimeList,
  namePage: string
) {
  let animeEdited = animeIncidence
  let { episodes } = animeIncidence
  const { dataAnilist } = animeIncidence
  let needUpdate = false
  const episodewithoutNaN =
    (Number.isNaN(resultScrapedForItem.episode) ? dataAnilist.episodes : resultScrapedForItem.episode) ||
    EpisodeNumber.Invalid

  if (episodewithoutNaN === EpisodeNumber.Invalid) {
    console.log('Episode is Null value, status: ' + dataAnilist.status)
    return { animeEdited, needUpdate, episodeisNull: { at: resultScrapedForItem } }
  }
  const fivedaytomiliseconds = 432_000_000
  if (Date.now() > animeIncidence.updateAnilist + fivedaytomiliseconds) {
    console.log('Anilist updated for time expired')
  }

  const setEpisodesStatus = setEpisode(episodes, episodewithoutNaN, resultScrapedForItem, namePage)
  needUpdate = setEpisodesStatus.needUpdate
  animeEdited.episodes = { ...setEpisodesStatus.episodes }

  return { animeEdited, needUpdate }
}
