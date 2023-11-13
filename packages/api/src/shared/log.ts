import { writeFile, readFile, readdir, rm } from 'fs/promises'
import type { Log, LogType } from '../../../types'

async function read(pathFile: string) {
  try {
    return JSON.parse(await readFile(pathFile, { encoding: 'utf-8' }))
  } catch {
    return []
  }
}
async function cutCollection(limit: number) {
  const files = (await readdir('logs/')).filter(file => file.endsWith('.json'))
  const deletesFiles = files.slice(limit)
  for (const file of deletesFiles) {
    await rm('logs/' + file)
  }
}
export async function log({ type, message, content, section }: Log) {
  const date = new Date()
  const day = date.getUTCDate()
  const month = date.getUTCMonth()
  const year = date.getUTCFullYear()
  const pathFile = `logs/${year}-${month}-${day}.json`
  await cutCollection(15)

  const logFile = await read(pathFile)

  const newLog = { type, message, content, section, timestamp: Date.now() }
  await writeFile(pathFile, JSON.stringify([newLog, ...logFile]).replace(';', ''), { encoding: 'utf-8' })
}
function buildLogger(type: LogType) {
  return async ({ content, message, section }: Omit<Log, 'type'>) => {
    await log({ type, content, message, section })
  }
}
const logger = {
  warn: buildLogger('warning'),
  error: buildLogger('error'),
  info: buildLogger('info')
}
export default logger
