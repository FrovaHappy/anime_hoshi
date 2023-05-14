import IntervalScrap from './intervalScrap'
import { mongoose } from './mongoose'
import { parserUrlsPages } from './parserUrlsPages'
import serverApp from './app'
;(async () => {
  try {
    await mongoose()
    const parser = await parserUrlsPages()
    console.log(parser)
    serverApp()
    IntervalScrap()
  } catch (e) {
    console.error(e)
  }
})()
