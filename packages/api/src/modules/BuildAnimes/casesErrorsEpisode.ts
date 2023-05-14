import { AnimeList, DataAnilist, InfoEpisodeRecovered } from '../../../../types'
import { EpisodeNumber } from '../../Enum'

export function casesErrorsEpisode(
  anime: AnimeList | null,
  mediaAnilist: DataAnilist,
  itemScraper: InfoEpisodeRecovered,
  namePage: string
) {
  const episodesAnilist = mediaAnilist.episodes ?? NaN
  let error = null
  if (itemScraper.episode === EpisodeNumber.lastEpisodeNotFound) {
    if (!isNaN(episodesAnilist)) {
      itemScraper.episode = episodesAnilist
    } else {
      error = {
        typeError: 'episode no found',
        namePage,
        url: itemScraper.url,
        title: itemScraper.title,
        episode: itemScraper.episode,
      }
    }
  }

  if (episodesAnilist < itemScraper.episode) {
    if (anime?.lastEpisodesOfTempPreview) {
      itemScraper.episode -= episodesAnilist
    } else {
      error = {
        typeError: 'overflow episode',
        namePage,
        url: itemScraper.url,
        title: itemScraper.title,
        episode: itemScraper.episode,
      }
    }
  }
  return {
    itemScraper,
    error,
  }
}
