import { startRestructureData } from './module-scrapping';
import { mongoose } from './mongoose'
import { parserUrlsPages } from './parserUrlsPages'
;(async () => {
  try {
    await mongoose()
    const parser = await parserUrlsPages()
    console.log(parser)
    await import('./app')
    startRestructureData()
    setInterval(() => startRestructureData(), 900000) // 15 minutes
  } catch (e) {
    console.error(e)
  }
})()
