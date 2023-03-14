import { mongoose } from '../mongoose'
import { setAnime } from './dataConversion'

async function startRestructureData() {
  await mongoose()
  const EndRestructureData = await setAnime()
  process.send!(EndRestructureData)
  return
}

;(async () => {
  await startRestructureData()
})()
