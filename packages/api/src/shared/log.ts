import { writeFile, readFile } from 'fs/promises'
import path from 'path'
import type { Log } from '../../../types'

export default async function log ({ type, message, content }: Log) {
  const date = new Date()
  const day = date.getUTCDate()
  const month = date.getUTCMonth()
  const year = date.getUTCFullYear()
  const pathFile = path.join(__dirname, `../../log/${year}-${month}-${day}.txt`)

  let logFile: any[]
  let oldLogFile: [string, any[]] = [pathFile, []]
  try {
    logFile = JSON.parse(await readFile(pathFile, { encoding: 'utf8' }))
    oldLogFile = [pathFile, logFile]
  } catch {
    oldLogFile[0] === pathFile ? (logFile = oldLogFile[1]) : (logFile = [])
  }

  const newLog = { type, message, content, timestamp: Date.now() }
  await writeFile(pathFile, JSON.stringify([newLog, ...logFile]).replace(';', ''))
}
