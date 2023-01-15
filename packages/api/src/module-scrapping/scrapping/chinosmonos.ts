import { Browser } from 'playwright'
import { InfoEpisodeRecovered } from '../types'
export async function scannedMonoschinos(browser: Browser) {
  const page = await browser.newPage({ permissions: [] })
  await page.goto('https://monoschinos2.com/', { waitUntil: 'domcontentloaded' })

  const content = await page.evaluate(() => {
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
  })
  await page.close()
  return { monosChinos: content }
}
