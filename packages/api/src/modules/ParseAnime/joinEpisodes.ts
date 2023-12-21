import { type Anime } from '../../../../types/Anime'
import { type ScrapEpisode } from '../../../../types/ScrapEpisode'

interface Params {
  anime: Anime
  episodeScraper: ScrapEpisode
  namePage: string
}
export default function joinEpisodes({ anime }: Params) {
  return anime
}
