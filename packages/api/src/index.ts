import { mongoose } from './mongoose'
import serverApp from './app'
import parseAnimeV2 from './parseAnimeV2'

import { TimestampTimings } from './Enum'
import ScrapingPages from './modules/scrapingPages'
import parseAnimes from './modules/ParseAnime'

async function runParseAnimes() {
  const pagesScraped = await ScrapingPages()
  await parseAnimes(pagesScraped)
}
;(async () => {
  await mongoose()
  await parseAnimeV2()
  await runParseAnimes()

  setInterval(runParseAnimes, TimestampTimings.fifteenMinutes)
  serverApp()
})()
