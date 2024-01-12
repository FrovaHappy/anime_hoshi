import { type Scrap } from '../../../../types/ScrapEpisode'
import ScrapPagesDb, { type ScrapPageResponse } from '../../database/scrapPages.db'
import buildEpisodes from './buildEpisodes'
import getHtml from './getHtml'

export async function BuildData(page: ScrapPageResponse): Promise<Scrap> {
  const dataHtml = await getHtml(page.url)
  const { episodes, validateResult } = await buildEpisodes(dataHtml.content, page)
  page.validatesResults = [validateResult, ...page.validatesResults].slice(0, 50)
  await ScrapPagesDb.replaceOne({ _id: page._id }, page)
  return {
    namePage: page.namePage,
    defaultLang: page.defaultLang,
    episodes: episodes.reverse()
  }
}
export default async function ScrapingPages() {
  console.log('start scraping pages...')
  const logTime = '· resolved in'
  console.time(logTime)
  const scrapPages = await ScrapPagesDb.getAll()
  const pages = await Promise.all(
    scrapPages.map(async page => {
      return await BuildData(page)
    })
  )
  console.timeEnd(logTime)
  return pages.filter(page => page.episodes.length > 0)
}
