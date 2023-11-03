import type { Response, Request } from 'express'
import type { ExtBodyUserVerified } from '../../../middleware/auth'
import type { JsonResponse } from '../../../../../types'

export default async function read(req: Request<any, any, ExtBodyUserVerified>, res: Response<JsonResponse>) {
  const userVerified = req.body.userVerified

  res.status(200).json({
    code: 200,
    message: 'pass',
    ok: true,
    contents: { newToken: userVerified.newToken }
  })
}
