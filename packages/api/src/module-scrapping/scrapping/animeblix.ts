import { Browser } from 'playwright'
import { InfoEpisodeRecovered } from '../../../../types'
export async function scannedAnimeblix(browser: Browser) {
  const page = await browser.newPage()
  await page.goto('https://animeblix.com/', { timeout: 0, waitUntil: 'domcontentloaded' })

  const content = await page.evaluate(() => {
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
  })
  await page.close()
  return { animeblix: content }
}
