import { chromium } from 'playwright'

import { scannedAnimeblix } from './scrapping/animeblix'
import { scannedJkanime } from './scrapping/jkanime'
import { scannedAnimeFlv } from './scrapping/animeFlv'
import { scannedMonoschinos } from './scrapping/chinosmonos'

export async function startScrapping() {
  const browser = await chromium.launch()

  let pagesScrapped = await Promise.all([
    scannedAnimeFlv(browser),
    scannedMonoschinos(browser),
    scannedAnimeblix(browser),
    scannedJkanime(browser),
  ])
  const pages = pagesScrapped
  // .map((page) => {
  //   if (page.status === 'fulfilled') {
  //     return page.value
  //   }
  //   console.error(`Failed to load ${page.reason} \n`)
  //   return []
  // })
  // .flat()
  browser.close()
  return pages
}
