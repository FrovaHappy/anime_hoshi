import { readdirSync } from 'fs'
import { readFile } from 'fs/promises'
async function getLogs() {
  const logsFiles = readdirSync('logs/').filter(file => file.endsWith('.json'))
  const logs = logsFiles.map(file => file.replace('.json', ''))
  return logs
}

async function getLog(nameFile: string): Promise<any[] | null> {
  const pathFile = `logs/${nameFile}.json`
  try {
    return JSON.parse(await readFile(pathFile, { encoding: 'utf-8' }))
  } catch {
    return null
  }
}

export default { getLog, getLogs }
