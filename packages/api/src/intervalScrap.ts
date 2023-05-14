import { TimestampTimings } from './Enum'
import { setAnime } from './modules/BuildAnimes/dataConversion'
import ScrapingPages from './modules/scrapingPages'
import { pushNotifications } from './shared/pushNotifications'
import refreshCache from './utils/refreshCache'

async function runSortAnimes() {
  const pagesScraped = await ScrapingPages()
  const { animeUpdated, animespublished, errors } = await setAnime(pagesScraped)
  await refreshCache.animeList(animespublished, animeUpdated)
  console.log(`animesUpdated: ${JSON.stringify(animeUpdated.map((anime) => anime.dataAnilist.id))}`)
  console.log(`errors: ${errors.length}\n···················`)
  console.log(await pushNotifications(animeUpdated))
}
export default function IntervalScrap() {
  runSortAnimes()
  setInterval(runSortAnimes, TimestampTimings.fifteenMinutes)
}
