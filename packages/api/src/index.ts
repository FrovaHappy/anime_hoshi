import { mongoose } from './mongoose'

;(async () => {
  try {
    await mongoose()
    await import('./module-scrapping/index') // start module scrapping
    await import('./app')
  } catch (e) {
    console.error(e)
  }
})()
