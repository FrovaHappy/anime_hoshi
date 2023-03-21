import { fork } from 'child_process'
import path from 'path'
import refreshCache from '../utils/refreshCache'
import { setAnime } from './dataConversion'
import { PagesScraped } from '../../type'
import { pushNotifications } from './modules/pushNotifications'

export function startRestructureData() {
  const pathFile = path.join(__dirname, 'startScraping')
  const childProcess = fork(pathFile, { timeout: 40000 })
  childProcess.on('message', async (message: PagesScraped) => {
    childProcess.kill()
    const { animeUpdated, animespublished, errors } = await setAnime(message)
    await refreshCache.animeList(animespublished, animeUpdated)
    console.log(`animesUpdated: ${JSON.stringify(animeUpdated.map((anime) => anime.dataAnilist.id))}`)
    console.log(`errors: ${errors.length}\n···················`)
    console.log(await pushNotifications(animeUpdated))
  })
  childProcess.addListener('close', (code) => {
    console.log('Done subprocess with code: ' + code)
  })
  return
}
