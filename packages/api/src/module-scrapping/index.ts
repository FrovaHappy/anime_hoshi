import { setAnime } from './dataConversion'
import { mongoose } from './mongoose'
;(async () => {
  await mongoose()
  await setAnime()
  let interval = setInterval(async () => {
    await setAnime()
  }, 900000) // 15 minutes
  interval
})()
