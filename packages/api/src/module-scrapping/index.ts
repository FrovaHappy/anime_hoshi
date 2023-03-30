import { fork } from 'child_process'
import path from 'path'
import refreshCache from '../utils/refreshCache'
import { setAnime } from './dataConversion'
import { pushNotifications } from './modules/pushNotifications'
import * as fsPromise from 'fs/promises'

export function startRestructureData() {
  const pathFile = path.join(__dirname, 'startScraping')
  const childProcess = fork(pathFile, { timeout: 28000 })
  childProcess.addListener('close', async (code) => {
    console.log('* Done scraping... code: ' + code || 'null')
    if (code !== 0) throw new Error('* Failed scraping... code: ' + code || 'null')
    const pages = JSON.parse(await fsPromise.readFile('./pages.txt', 'utf8'))
    const { animeUpdated, animespublished, errors } = await setAnime(pages)
    await refreshCache.animeList(animespublished, animeUpdated)
    console.log(`animesUpdated: ${JSON.stringify(animeUpdated.map((anime) => anime.dataAnilist.id))}`)
    console.log(`errors: ${errors.length}\n···················`)
    console.log(await pushNotifications(animeUpdated))
  })
  return
}
