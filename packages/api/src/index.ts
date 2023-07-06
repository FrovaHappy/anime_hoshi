import IntervalScrap from './intervalScrap'
import { mongoose } from './mongoose'
import serverApp from './app'
;(async () => {
  await mongoose()
  //TODO: agregar parseado a la v2 de Anime
  serverApp()
  IntervalScrap()
})()
