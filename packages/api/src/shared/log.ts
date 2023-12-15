import { writeFile, readFile, readdir, rm, mkdir } from 'fs/promises'
import type { Log, LogType } from '../../../types'
import { configs } from '../config'

async function createDirectory() {
  try {
    await mkdir(configs.LOGS_PATH)
  } catch (err: any) {
    if (!(err.code === 'EEXIST')) throw err
  }
}

async function getLog(pathFile: string) {
  try {
    return JSON.parse(await readFile(pathFile, { encoding: 'utf-8' }))
  } catch {
    return []
  }
}
async function cutCollection(limit: number) {
  const files = (await readdir(configs.LOGS_PATH)).filter(file => file.endsWith('.json'))
  const deletesFiles = files.slice(limit)
  for (const file of deletesFiles) {
    await rm(configs.LOGS_PATH + file)
  }
}
async function log({ type, message, content, section }: Log) {
  try {
    await createDirectory()

    const date = new Date()
    const day = date.getUTCDate()
    const month = date.getUTCMonth()
    const year = date.getUTCFullYear()
    const pathFile = `${configs.LOGS_PATH}${year}-${month}-${day}.json`
    await cutCollection(15)

    const logFile = await getLog(pathFile)

    const newLog = { type, message, content, section, timestamp: Date.now() }
    await writeFile(pathFile, JSON.stringify([newLog, ...logFile]).replace(';', ''), { encoding: 'utf-8' })
  } catch (err) {
    console.error(err)
  }
}
function buildLogger(type: LogType) {
  return async ({ content, message, section }: Omit<Log, 'type'>) => {
    await log({ type, content, message, section })
  }
}
async function getLogs() {
  await createDirectory()
  const files = (await readdir(configs.LOGS_PATH)).filter(file => file.endsWith('.json'))
  return files
}

const logger = {
  warn: buildLogger('warning'),
  error: buildLogger('error'),
  info: buildLogger('info'),
  getLog,
  getLogs
}

export default logger
