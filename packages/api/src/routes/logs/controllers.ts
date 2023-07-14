import { Request, Response } from 'express'
import logsServices from './services'
import { JsonResponse } from '../../../../types'
export async function getLogs(req: Request, res: Response) {
  const onDate = req.query.onDate?.toString()
  if (onDate) {
    const log = await logsServices.getLog(onDate)
    return log.length > 0
      ? res.status(200).json({ code: 200, message: 'onDate Found', contents: log } as JsonResponse)
      : res.status(409).json({
          code: 409,
          message: 'onDate not is a validated string or bad onDate',
          contents: null,
        } as JsonResponse)
  }
  const logs = await logsServices.getLogs()
  return res.status(200).json({ code: 200, message: 'logs Collections 🍵 here...', contents: logs } as JsonResponse)
}
