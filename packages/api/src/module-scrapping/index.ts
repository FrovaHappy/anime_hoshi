import { setAnime } from './dataConversion'
import refreshCache from './modules/refreshCache'

async function startRestructureData() {
  const { errors, animeUpdated, animespublished } = await setAnime()
  await refreshCache.animeList(animespublished, animeUpdated)
  console.log(`animesUpdated: ${JSON.stringify(animeUpdated.map((anime) => anime.dataAnilist.id))}`)
  console.log(`errors: ${errors.length}`)
  return
}

;(async () => {
  await startRestructureData()
  setInterval(async () => {
    await startRestructureData()
  }, 900000) // 15 minutes
})()
