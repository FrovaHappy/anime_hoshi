import { startRestructureData } from './module-scrapping/index'
import { mongoose } from './mongoose'
import { parserUrlsPages } from './parserUrlsPages'
import serverApp from './app'
;(async () => {
  try {
    await mongoose()
    const parser = await parserUrlsPages()
    console.log(parser)
    serverApp()
    startRestructureData()
    setInterval(() => startRestructureData(), 900000) // 15 minutes
  } catch (e) {
    console.error(e)
  }
})()
