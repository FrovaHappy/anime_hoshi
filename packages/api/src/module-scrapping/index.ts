import { setAnime } from './dataConversion'
;(async () => {
  await setAnime()
  let interval = setInterval(async () => {
    await setAnime()
  }, 900000) // 15 minutes
  interval
})()
