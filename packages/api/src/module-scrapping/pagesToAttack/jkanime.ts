import { Browser } from 'playwright'
import { InfoEpisodeRecovered } from '../../../../types'
import { newPageToScrap } from '../modules/newPageToScrap'
async function scannedJkanime(browser: Browser) {
  const callback = () => {
    const ListEpisodios = document.querySelector('.maximoaltura')
    const arrayLi = ListEpisodios?.querySelectorAll('a')
    let infoEpisodeRecovered: InfoEpisodeRecovered[] = []
    arrayLi?.forEach((element) => {
      let episodeString = element.querySelector('h6')!.textContent!.match(/[\w\d]+/g)
      const episode = parseInt(episodeString === null ? '' : episodeString.at(-1) ?? '')
      const infoCap = {
        url: element.href!,
        episode,
        title: element.querySelector('h5')!.textContent!,
      }
      infoEpisodeRecovered.push(infoCap)
    })
    return infoEpisodeRecovered
  }
  const content = await newPageToScrap({
    browser,
    url: 'https://jkanime.net/',
    pageTitle: 'jkanime',
    textToMatches: 'Programación',
    callback,
  })
  return content
}
export default {
  startAttackPage: scannedJkanime,
}
