import { AnimeList } from '../../../types'

export function getlastEpisodeInfo(animeList: AnimeList) {
  const keyLastEpisode =
    Object.keys(animeList?.episodes ?? {})
      .sort((a, b) => parseInt(a) - parseInt(b))
      .at(-1) ?? ''
  const KeyNamePages = Object.keys(animeList?.episodes[keyLastEpisode]?.pagesUrl ?? {})
  const updateEpisode = animeList?.episodes[keyLastEpisode]?.updateEpisode!
  return {
    keyLastEpisode,
    KeyNamePages,
    updateEpisode,
  }
}
