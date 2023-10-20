import * as fs from 'fs'
import { readFile } from 'fs/promises'
async function getLogs () {
  const logsfiles = fs.readdirSync('./log').filter((file) => file.endsWith('.txt'))
  const logs = logsfiles.map((file) => file.replace('.txt', ''))
  return logs
}

async function getLog (nameFile: string) {
  const pathFile = `./log/${nameFile}.txt`
  let logFile: any[]
  if (fs.existsSync(pathFile)) {
    logFile = JSON.parse(await readFile(pathFile, { encoding: 'utf8' }))
  } else {
    logFile = []
  }
  return logFile
}

export default { getLog, getLogs }
