import { DataAttck } from '../../../../type'
import buildScrapPages from '../buildScrapPages'

const data: DataAttck = {
  urlPage: 'https://www.crunchyroll.com/es/simulcastcalendar?filter=premium',
  selectorEpisodes: '.today > .calendar-day > .day-content > .releases > li',
  selectorEpisode: '.episode-label',
  positionEpisodeInString: -1,
  selectorUrl: '.featured-episode > a',
  selectorTitle: '.season-name > a > cite',
  namePages: 'crunchyroll',
  testMode: false,
  remplaceEpisode: [['Estreno', '1']],
}
export default {
  data,
  run: async () => await buildScrapPages(data),
}
