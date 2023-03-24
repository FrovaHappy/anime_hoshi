import { Browser } from 'playwright-core'
import { InfoEpisodeRecovered } from '../../../../../types'
import { newPageToScrap } from '../newPageToScrap'
async function scannedAnimeblix(browser: Browser) {
  const callback = () => {
    const ListEpisodios = document.querySelector('.latestEpisodes')?.querySelector('.row')
    const arrayLi = ListEpisodios?.querySelectorAll('.col-6')
    let infoEpisodeRecovered: InfoEpisodeRecovered[] = []
    arrayLi?.forEach((element) => {
      const elementA = element.querySelector('.episodeListItem__title')!.querySelector('a')!
      let episodeString = element.querySelector('.episodeListItem__number')!.textContent!
      episodeString = episodeString.split(' ')[2]
      const episode = parseInt(episodeString)

      let title = elementA.textContent!
      title = title.replace('2da Temporada', '2nd Season')
      title = title.replace('Temporada 2', '2nd Season')
      title = title.replace('Temporada', 'Season')
      title = title.replace('Parte', 'Part')

      const infoCap = {
        url: elementA.href!,
        episode,
        title: title,
      }
      infoEpisodeRecovered.push(infoCap)
    })
    return infoEpisodeRecovered
  }
  const content = await newPageToScrap({
    browser,
    url: 'https://animeblix.com/',
    pageTitle: 'animeblix',
    selectorAwait: '.main-home',
    callback,
  })
  return content
}

export default {
  startAttackPage: scannedAnimeblix,
}
