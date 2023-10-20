import * as fs from 'fs'
import * as path from 'path'
import type { DataAttck } from '../../../type'
import type { InfoEpisodeRecovered, PagesAttacked } from '../../../../types'
type PageAttackedPromise = Promise<Record<string, InfoEpisodeRecovered[]> | null>
interface File {
  data: DataAttck
  run: () => PageAttackedPromise
}
export default async function ScrapingPages () {
  console.log('start scraping pages...')
  console.time('total time of atack')
  const pagesToAtack = fs.readdirSync(path.join(__dirname, 'pagesToAttack/'))
  const pages = await Promise.all(
    pagesToAtack.map(async page => {
      const pageRun: File = (await require(`./pagesToAttack/${page}`)).default
      return await pageRun.run()
    })
  )
  console.timeEnd('total time of atack')
  return pages.filter(page => page !== null) as PagesAttacked
}
