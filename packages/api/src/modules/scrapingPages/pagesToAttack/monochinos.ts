import { DataAttck } from '../../../../type'
import buildScrapPages from '../buildScrapPages'

const data: DataAttck = {
  urlPage: 'https://monoschinos2.com/',
  selectorEpisodes: '.row > .col',
  selectorEpisode: '.positioning > p',
  selectorUrl: 'a',
  selectorTitle: '.animetitles',
  positionEpisodeInString: -1,
  namePages: 'monosChinos',
  testMode: false,
}
export default {
  data,
  run: async () => await buildScrapPages(data),
}
