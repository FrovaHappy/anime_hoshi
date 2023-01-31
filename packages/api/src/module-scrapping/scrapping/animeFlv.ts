import { Browser } from 'playwright'
import { InfoEpisodeRecovered } from '../../../../types'
export async function scannedAnimeFlv(browser: Browser) {
  const page = await browser.newPage()
  await page.goto('https://www3.animeflv.net/', {
    timeout: 0,
    waitUntil: 'domcontentloaded',
  })
  const content = await page.evaluate(() => {
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
  })
  await page.close()
  return { animeFlv: content }
}
