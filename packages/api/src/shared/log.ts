import { writeFile, readFile } from 'fs/promises'
import { existsSync } from 'fs'
type LogType = 'info' | 'warning' | 'error'
export default async function Log({ type, message, content }: { type: LogType; message: string; content: Object }) {
  const date = new Date()
  const day = date.getUTCDate()
  const month = date.getUTCMonth()
  const year = date.getUTCFullYear()
  const pathFile = `./log/${year}-${month}-${day}.txt`

  let logFile: any[]
  if (existsSync(pathFile)) {
    console.log(pathFile)
    logFile = JSON.parse(await readFile(pathFile, { encoding: 'utf8' }))
  } else {
    console.log(pathFile)
    logFile = []
  }

  const newLog = { type, message, content, timestamp: Date.now() }
  await writeFile(pathFile, JSON.stringify([newLog, ...logFile]))
}
