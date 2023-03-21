import { chromium } from 'playwright-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import * as fs from 'fs'
import path from 'path'
import { Browser } from 'playwright'
import { InfoEpisodeRecovered } from '../../../../types'
type FileAttack = {
  startAttackPage: (browser: Browser) => {
    content: { [key: string]: InfoEpisodeRecovered }
    error: { value: boolean; message: string }
  }
}

const scrapersPagesFiles = fs.readdirSync(path.join(__dirname, 'pagesToAttack/'))

async function startScrapping() {
  console.log('start scraping atack...')
  console.time('browser-scraping')
  const getPagesAttacks: FileAttack[] = []
  for (const namefile of scrapersPagesFiles) {
    const file: FileAttack = (await import(path.join(__dirname, 'pagesToAttack/', namefile))).default
    getPagesAttacks.push(file)
  }

  chromium.use(StealthPlugin())
  const browser = await chromium.launch()

  let pagesScrapped = await Promise.all(getPagesAttacks.map((page) => page.startAttackPage(browser)))
  const pages = pagesScrapped.map((page) => {
    if (page.error.value === true) {
      console.log(`${Object.keys(page.content)[0]}: ${page.error.message}`)
    }
    return page.content
  })
  await browser.close().catch(() => {
    throw new Error('Failed to try closed browser')
  })
  console.timeEnd('browser-scraping')
  process.send!(pages)
  return
}
startScrapping()
