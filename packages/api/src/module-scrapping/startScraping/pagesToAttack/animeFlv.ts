import { Browser } from 'playwright'
import { InfoEpisodeRecovered } from '../../../../../types'
import { newPageToScrap } from '../newPageToScrap'
async function scannedAnimeFlv(browser: Browser) {
  const callback = () => {
    const ListEpisodios = document.querySelector('.ListEpisodios')
    const arrayLi = ListEpisodios?.querySelectorAll('li')
    let infoEpisodeRecovered: InfoEpisodeRecovered[] = []
    arrayLi?.forEach((element) => {
      let episodeString = element.querySelector('.Capi')!.textContent!
      episodeString = episodeString.split(' ')[1]
      const episode = parseInt(episodeString)

      const infoCap = {
        url: element.querySelector('a')!.href!,
        episode,
        title: element.querySelector('.Title')!.textContent!,
      }
      infoEpisodeRecovered.push(infoCap)
    })
    return infoEpisodeRecovered
  }
  const content = await newPageToScrap({
    browser,
    url: 'https://www3.animeflv.net/',
    pageTitle: 'animeFlv',
    selectorAwait: '.Main',
    callback,
  })
  return content
}
export default {
  startAttackPage: scannedAnimeFlv,
}
