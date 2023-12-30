import logger from '../../shared/log'
import sendNotifications from './pushNotifications'
import { type Scrap } from '../../../../types/ScrapEpisode'
import updateAnime from './updateAnime'

async function updateAnimes(scrap: Scrap) {
  const { namePage, defaultLang, episodes } = scrap
  const result = {
    updated: 0,
    ignores: 0,
    total: episodes.length
  }
  for (const ep of episodes) {
    const hasUpdated = await updateAnime({ defaultLang, episodeScraper: ep, namePage })
    hasUpdated ? (result.updated += 1) : (result.ignores += 1)
  }
  return result
}

export default async function index(pagesAttacked: Scrap[]) {
  for (const pageScrap of pagesAttacked) {
    const { namePage } = pageScrap
    const result = await updateAnimes(pageScrap)
    await logger.info({
      content: result,
      message: `result of ${namePage}: ${result.total} T - ${result.updated} U/ ${result.ignores} I`,
      section: 'general'
    })
  }
  await sendNotifications.run()
  console.log('finished')
}
