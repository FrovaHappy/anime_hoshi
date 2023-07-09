import { DataAttck } from '../../../../type'
import buildScrapPages from '../buildScrapPages'

const data: DataAttck = {
  urlPage: 'https://animeblix.com/',
  selectorEpisodes: '.latestEpisodes > .row > .col-6',
  selectorEpisode: '.episodeListItem__number',
  positionEpisodeInString: -1,
  selectorUrl: 'a',
  selectorTitle: '.episodeListItem__title > a',
  namePages: 'animeblix',
  testMode: false,
  remplaceTitle: [
    ['Segunda Temporada', '2nd Season'],
    ['2da Temporada', '2nd Season'],
    ['Temporada 2', '2nd Season'],
    ['Temporada', 'Season'],
    ['Parte', 'Part'],
  ],
}
export default {
  data,
  run: async () => await buildScrapPages(data),
}
