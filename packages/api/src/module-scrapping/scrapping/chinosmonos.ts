import { BrowserContext } from 'playwright'
import { InfoEpisodeRecovered } from '../../../../types'
async function scannedMonoschinos(browser: BrowserContext) {
  const page = await browser.newPage()
  await page.goto('https://monoschinos2.com/', { waitUntil: 'commit' })
  await page.getByText('Capítulos Recientes').waitFor()

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
  return { monosChinos: content.reverse() }
}
export default {
  startAttackPage: scannedMonoschinos,
}
