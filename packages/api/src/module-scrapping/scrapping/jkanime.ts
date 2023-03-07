import { Browser } from 'playwright'
import { InfoEpisodeRecovered } from '../../../../types'
async function scannedJkanime(browser: Browser) {
  const page = await browser.newPage()
  await page.goto('https://jkanime.net/', { waitUntil: 'commit' })
  await page.getByText('ÚLTIMOS ANIMES AGREGADOS').waitFor()

  const content = await page.evaluate(() => {
    const ListEpisodios = document.querySelector('.maximoaltura')
    const arrayLi = ListEpisodios?.querySelectorAll('a')
    let infoEpisodeRecovered: InfoEpisodeRecovered[] = []
    arrayLi?.forEach((element) => {
      let episodeString = element.querySelector('h6')!.textContent!.split(/[ ]+/)
      const episode = parseInt(episodeString[2])

      const infoCap = {
        url: element.href!,
        episode,
        title: element.querySelector('h5')!.textContent!,
      }
      infoEpisodeRecovered.push(infoCap)
    })
    return infoEpisodeRecovered
  })
  await page.close()
  return { jkanime: content.reverse() }
}
export default {
  startAttackPage: scannedJkanime,
}
