import IntervalScrap from './intervalScrap'
import { mongoose } from './mongoose'
import { parserUrlsPages } from './parserUrlsPages'
import serverApp from './app'
;(async () => {
  await mongoose()
  await parserUrlsPages()
  serverApp()
  IntervalScrap()
})()
