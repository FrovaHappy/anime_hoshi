import type { Request, Response } from 'express'
import type { JsonResponse } from '../../../../types'
import logsServices from './services'
export async function getLogs(req: Request, res: Response<JsonResponse>) {
  const onDate = req.query.onDate?.toString()
  if (!onDate) {
    const logs = await logsServices.getLogs()
    return res.status(200).json({ code: 200, ok: true, message: 'logs Collections 🍵 here...', contents: logs })
  }
  const log = await logsServices.getLog(onDate)
  if (log.length === 0) {
    return res.status(409).json({
      code: 409,
      message: 'onDate not is a validated string or bad onDate',
      contents: null,
      ok: false
    })
  }
  return res.status(200).json({ code: 200, message: 'onDate Found', ok: true, contents: log })
}
