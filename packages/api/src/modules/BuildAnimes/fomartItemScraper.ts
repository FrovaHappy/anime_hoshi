import { InfoEpisodeRecovered } from '../../../../types'
import { EpisodeNumber } from '../../Enum'
function remplaseTitle(title: string) {
  title = title.replace(/["]/g, '')
  title = title.replace('2da Temporada', '2nd Season')
  title = title.replace('Temporada 2', '2nd Season')
  title = title.replace('Temporada', 'Season')
  title = title.replace('Parte', 'Part')
  return title
}
export function formartItemScraper(itemScrap: InfoEpisodeRecovered) {
  itemScrap.title = remplaseTitle(itemScrap.title)
  if (!Boolean(itemScrap.episode)) itemScrap.episode = EpisodeNumber.lastEpisodeNotFound
  return itemScrap
}
