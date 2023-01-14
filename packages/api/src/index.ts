import { mongoose } from './mongoose'

;(async () => {
  try {
    await mongoose()
    await import('./app')
  } catch (e) {
    console.error(e)
  }
})()
