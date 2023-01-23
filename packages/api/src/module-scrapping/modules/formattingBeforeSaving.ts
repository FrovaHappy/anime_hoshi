import { AnimeList, Episodes, InfoEpisodeRecovered } from '../../../../types'

function setEpisode(
  episodesOfAnimeList: Episodes,
  episodewithoutNaN: number,
  resultScrapedForItem: InfoEpisodeRecovered,
  namePage: string
) {
  const numberOfEpisode = episodewithoutNaN
  let needUpdate = false
  let episodes = episodesOfAnimeList
  let episode = episodes[numberOfEpisode]
  if (episode) {
    const pagesUrl = episode.pagesUrl
    if (pagesUrl[namePage]) return { episodes, needUpdate }

    needUpdate = true
    pagesUrl[namePage] = resultScrapedForItem.url
    episode.pagesUrl = pagesUrl
    episode.updateEpisode = Date.now()
    episodes[numberOfEpisode] = episode
  } else {
    needUpdate = true
    let pageUrl = {
      [namePage]: resultScrapedForItem.url,
    }
    let newEpisode = {
      updateEpisode: Date.now(),
      pagesUrl: pageUrl,
    }
    episodes[numberOfEpisode] = newEpisode
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
  let needUpdate = false
  const fivedaytomiliseconds = 432_000_000
  if (Date.now() > animeIncidence.updateAnilist + fivedaytomiliseconds) {
    console.log('Anilist updated for time expired')
  }

  const setEpisodesStatus = setEpisode(episodes, resultScrapedForItem.episode, resultScrapedForItem, namePage)
  needUpdate = setEpisodesStatus.needUpdate
  animeEdited.episodes = { ...setEpisodesStatus.episodes }

  return { animeEdited, needUpdate }
}
