import { Request, Response } from 'express'
import logsServices from '../services/logs.services'
export async function getLogs(req: Request, res: Response) {
  const { onDate } = req.query
  if (onDate && typeof onDate === 'string') {
    const log = await logsServices.getLog(onDate)
    return res.status(200).json({ code: 200, ok: true, contents: log })
  } else if (onDate) {
    return res.status(409).json({ code: 409, ok: false, menssage: 'onDate not is a validated string' })
  }
  const logs = await logsServices.getLogs()
  return res.status(200).json({ code: 200, ok: true, content: logs })
}
