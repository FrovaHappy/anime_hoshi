import logger from '../../shared/log'
import { configs } from '../../config'
async function getLogs() {
  const logsFiles = await logger.getLogs()
  const logs = logsFiles.map(file => file.replace('.json', ''))
  return logs
}

async function getLog(nameFile: string): Promise<any[] | null> {
  const pathFile = `${configs.LOGS_PATH}${nameFile}.json`
  const log = await logger.getLog(pathFile)
  if (log.length === 0) return null
  return log
}

export default { getLog, getLogs }
