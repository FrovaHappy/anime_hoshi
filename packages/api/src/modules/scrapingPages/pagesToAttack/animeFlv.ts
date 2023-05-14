import { DataAttck } from '../../../../type'
import buildScrapPages from '../buildScrapPages'

const data: DataAttck = {
  urlPage: 'https://www3.animeflv.net/',
  selectorEpisodes: '.ListEpisodios > li',
  selectorEpisode: '.Capi',
  positionEpisodeInString: -1,
  selectorUrl: 'a',
  selectorTitle: '.Title',
  namePages: 'animeFlv',
  testMode: false,
}
export default {
  data,
  run: async () => await buildScrapPages(data),
}
