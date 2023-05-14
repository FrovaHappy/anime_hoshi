import { InfoEpisodeRecovered } from '../../../../types'
import { EpisodeNumber } from '../../Enum'

export function formartItemScraper(itemScrap: InfoEpisodeRecovered) {
  itemScrap.title = itemScrap.title.replace(/["]/g, '')
  if (!Boolean(itemScrap.episode)) itemScrap.episode = EpisodeNumber.lastEpisodeNotFound
  return itemScrap
}
