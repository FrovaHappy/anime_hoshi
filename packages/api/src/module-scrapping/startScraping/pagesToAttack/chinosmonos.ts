import { Browser } from 'playwright-core'
import { InfoEpisodeRecovered } from '../../../../../types'
import { newPageToScrap } from '../newPageToScrap'
async function scannedMonoschinos(browser: Browser) {
  const callback = () => {
    const ListEpisodios = document.querySelector('.row')
    const arrayLi = ListEpisodios?.querySelectorAll('.col')
    let infoEpisodeRecovered: InfoEpisodeRecovered[] = []
    arrayLi?.forEach((element) => {
      let episodeString = element.querySelector('.positioning')!.querySelector('p')!.textContent!
      const episode = parseInt(episodeString)

      const infoCap = {
        url: element.querySelector('a')!.href!,
        episode,
        title: element.querySelector('.animetitles')!.textContent!,
      }
      infoEpisodeRecovered.push(infoCap)
    })
    return infoEpisodeRecovered
  }
  const content = await newPageToScrap({
    browser,
    url: 'https://monoschinos2.com/',
    pageTitle: 'monosChinos',
    selectorAwait: '.heroarea1',
    callback,
  })
  return content
}
export default {
  startAttackPage: scannedMonoschinos,
}
