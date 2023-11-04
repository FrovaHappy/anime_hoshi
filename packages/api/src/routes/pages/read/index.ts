import type { Response, Request } from 'express'
import type { ExtBodyUserVerified } from '../../../middleware/auth'
import type { JsonResponse } from '../../../../../types'
import scrapPagesDb from '../../../database/scrapPages.db'

export default async function read(req: Request<any, any, ExtBodyUserVerified>, res: Response<JsonResponse>) {
  const userVerified = req.body.userVerified
  const pages = await scrapPagesDb.getAll()
  res.status(200).json({
    code: 200,
    message: 'return pages successfully',
    ok: true,
    contents: { newToken: userVerified.newToken, pages }
  })
}
