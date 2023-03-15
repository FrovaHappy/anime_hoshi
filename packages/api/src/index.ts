import { startRestructureData } from './module-scrapping';
import { mongoose } from './mongoose'
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
