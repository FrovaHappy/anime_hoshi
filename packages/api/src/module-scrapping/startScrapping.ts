import { chromium } from 'playwright-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import * as fs from 'fs'
import path from 'path'
import { Browser } from 'playwright'
import { InfoEpisodeRecovered } from '../../../types'
type FileAttack = {
  startAttackPage: (browser: Browser) => {
    [key: string]: InfoEpisodeRecovered
  }
}

const scrapersPagesFiles = fs.readdirSync(path.join(__dirname, 'scrapping/'))

export async function startScrapping() {
  console.time('browser-scraping')
  const getPagesAttacks: FileAttack[] = []
  for (const namefile of scrapersPagesFiles) {
    const file: FileAttack = (await import(path.join(__dirname, 'scrapping/', namefile))).default
    getPagesAttacks.push(file)
  }

  chromium.use(StealthPlugin())
  const browser = await chromium.launch()

  let pagesScrapped = await Promise.allSettled(getPagesAttacks.map((page) => page.startAttackPage(browser)))
  const pages = pagesScrapped
    .map((page) => {
      if (page.status === 'fulfilled') {
        return page.value
      }
      console.error(`Failed to load ${page.reason} \n`)
      return []
    })
    .flat()
  await browser.close().catch(() => { throw new Error ('Failed to close')})
  console.timeEnd('browser-scraping')
  return pages
}
