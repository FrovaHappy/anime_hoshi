import { InfoEpisodeRecovered } from '../../../../types'
import { EpisodeNumber } from '../../Enum'

export function formartItemScraper(itemScrap: InfoEpisodeRecovered) {
  itemScrap.title = itemScrap.title.replace(/["]/g, '')
  if (isNaN(itemScrap.episode) || itemScrap.episode === null) itemScrap.episode = EpisodeNumber.lastEpisodeNotFound
  return itemScrap
}
