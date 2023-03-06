import { InfoEpisodeRecovered } from '../../../../types'
import { EpisodeNumber } from '../../Enum'

export function formartItemScraper(itemScrap: InfoEpisodeRecovered) {
  itemScrap.title = itemScrap.title.replace(/["]/g, '')
  itemScrap.episode = isNaN(itemScrap.episode) ? EpisodeNumber.lastEpisodeNotFound : itemScrap.episode
  return itemScrap
}
