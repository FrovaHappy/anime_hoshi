import { type Anime } from '../../../../../types/Anime'
import { mayorLastUpdate } from '../../../utils/general'

export default function animeMinified(anime: Anime) {
  const namePages = Object.keys(anime.pages)
  let refEpisode = 0
  let lastUpdateOld = 0
  for (const name of namePages) {
    const { lastUpdate, episode } = anime.pages[name].episodes[0]
    const time = lastUpdateOld < lastUpdate
    if (time) {
      refEpisode = episode
      lastUpdateOld = lastUpdate
    }
  }
  return {
    lastUpdate: mayorLastUpdate(anime),
    title: anime.title.romaji,
    image: anime.coverImage.large,
    id: anime.id,
    episode: refEpisode,
    color: anime.coverImage.color
  }
}
