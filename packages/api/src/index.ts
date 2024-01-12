import { mongoose } from './mongoose'
import serverApp from './app'

import { TimestampTimings } from './Enum'
import ScrapingPages from './modules/scrapingPages'
import parseAnimes from './modules/ParseAnime'
import animesCache from './utils/animesCache'
import animeDbHeals from './healsDb'

async function runParseAnimes() {
  const pagesScraped = await ScrapingPages()
  await parseAnimes(pagesScraped)
  await animesCache.refresh()
}
void (async () => {
  await mongoose()
  await animeDbHeals()
  await animesCache.init()
  await runParseAnimes()

  setInterval(runParseAnimes, TimestampTimings.fifteenMinutes)
  serverApp()
})()
