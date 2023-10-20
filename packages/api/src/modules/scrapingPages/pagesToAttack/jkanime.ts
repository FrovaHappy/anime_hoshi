import type { DataAttck } from '../../../../type'
import buildScrapPages from '../buildScrapPages'

const data: DataAttck = {
  urlPage: 'https://jkanime.net/',
  selectorEpisodes: '.anime_programing > a',
  selectorEpisode: 'h6',
  positionEpisodeInString: -1,
  selectorUrl: 'a',
  selectorTitle: 'h5',
  namePages: 'jkanime',
  testMode: false
}
export default {
  data,
  run: async () => await buildScrapPages(data)
}
