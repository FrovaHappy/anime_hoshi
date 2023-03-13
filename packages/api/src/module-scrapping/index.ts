import { setAnime } from './dataConversion'
;(async () => {
  await setAnime()
  setInterval(async () => {
    await setAnime()
  }, 900000) // 15 minutes
})()
