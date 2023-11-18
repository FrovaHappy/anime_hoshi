import type { JsonResponse } from '../../../../types'
import episodeErrorDb from '../../database/episodeError.db'
import type { ExtBodyUserVerified } from '../../middleware/auth'
import type { Request, Response } from 'express'
export default async function read(req: Request<any, any, ExtBodyUserVerified>, res: Response<JsonResponse>) {
  const { userVerified } = req.body
  const episodesError = await episodeErrorDb.getAll()
  res.status(200).json({
    code: 200,
    ok: true,
    message: ' all episodes error successfully obtained',
    contents: {
      newToken: userVerified.newToken,
      episodesError
    }
  })
}
