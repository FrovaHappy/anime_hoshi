import { mongoose } from './mongoose'
import { fork } from 'child_process'
import path from 'path'
import { AnimeList } from '../../types'
import refreshCache from './utils/refreshCache'

type Message = {
  errors: number[]
  animespublished: number[]
  animeUpdated: AnimeList[]
}
function startRestructureData() {
  const pathFile = path.join(__dirname, '/module-scrapping/index')
    const childProcess = fork(pathFile, { timeout: 40000 })
    childProcess.on('message', async (message: Message) => {
      const { animeUpdated, animespublished, errors } = message
      await refreshCache.animeList(animespublished, animeUpdated)
      console.log(`animesUpdated: ${JSON.stringify(animeUpdated.map((anime) => anime.dataAnilist.id))}`)
      console.log(`errors: ${errors.length}\n`)
      childProcess.kill()
    })
}
;(async () => {
  try {
    await mongoose()
    await import('./app')
    startRestructureData()
    setInterval(()=> startRestructureData(), 900000) // 15 minutes

  } catch (e) {
    console.error(e)
  }
})()
