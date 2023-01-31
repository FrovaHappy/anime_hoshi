import { chromium } from 'playwright'

import { scannedAnimeblix } from './animeblix'
import { scannedJkanime } from './jkanime'
import { scannedAnimeFlv } from './animeFlv'
import { scannedMonoschinos } from './chinosmonos'

export async function startScrapping() {
  const browser = await chromium.launch({
    chromiumSandbox: true,
    channel: 'msedge',
    headless: false,
  })

  let pagesScrapped = await Promise.allSettled([
    scannedAnimeFlv(browser),
    scannedMonoschinos(browser),
    scannedAnimeblix(browser),
    scannedJkanime(browser),
  ])
  const pages = pagesScrapped
    .map((page) => {
      if (page.status === 'fulfilled') {
        return page.value
      }
      console.error(`Failed to load ${page.reason} \n`)
      return []
    })
    .flat()
  browser.close()
  return pages
}
