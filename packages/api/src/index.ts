import { mongoose } from './mongoose'
import serverApp from './app'

import { TimestampTimings } from './Enum'
import ScrapingPages from './modules/scrapingPages'
import parseAnimes from './modules/ParseAnime'

async function runParseAnimes () {
  const pagesScraped = await ScrapingPages()
  await parseAnimes(pagesScraped)
}
void (async () => {
  await mongoose()
  await runParseAnimes()

  setInterval(runParseAnimes, TimestampTimings.fifteenMinutes)
  serverApp()
})()
