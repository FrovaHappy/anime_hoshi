import { writeFile, readFile } from 'fs/promises'
import { existsSync } from 'fs'
import { Log } from '../../../types'

export default async function Log({ type, message, content }: Log) {
  const date = new Date()
  const day = date.getUTCDate()
  const month = date.getUTCMonth()
  const year = date.getUTCFullYear()
  const pathFile = `./log/${year}-${month}-${day}.txt`

  let logFile: any[]
  if (existsSync(pathFile)) {
    logFile = JSON.parse(await readFile(pathFile, { encoding: 'utf8' }))
  } else {
    logFile = []
  }

  const newLog = { type, message, content, timestamp: Date.now() }
  await writeFile(pathFile, JSON.stringify([newLog, ...logFile]))
}
