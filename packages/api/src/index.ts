import IntervalScrap from './intervalScrap'
import { mongoose } from './mongoose'
import serverApp from './app'
import parseAnimeV2 from './parseAnimeV2'
;(async () => {
  await mongoose()
  await parseAnimeV2()
  serverApp()
  IntervalScrap()
})()
