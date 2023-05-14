import * as fs from 'fs'
import * as path from 'path'
import { DataAttck } from '../../type'
import { InfoEpisodeRecovered, PagesAttacked } from '../../../types'
type PageAttackedPromise = Promise<{ [x: string]: InfoEpisodeRecovered[] } | null>
export default async function ScrapingPages() {
  const pagesToAtack = fs.readdirSync(path.join(__dirname, 'pagesToAttack/'))
  const pages = await Promise.all(
    pagesToAtack.map(async (page) => {
      const pageRun: { data: DataAttck; run: () => PageAttackedPromise } = (await require(`./pagesToAttack/${page}`))
        .default
      return pageRun.run()
    })
  )
  return pages.filter((page) => page !== null) as PagesAttacked
}

ScrapingPages()
