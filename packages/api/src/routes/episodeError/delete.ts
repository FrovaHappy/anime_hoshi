import type { JsonResponse } from '../../../../types'
import episodeErrorDb from '../../database/episodeError.db'
import type { ExtBodyUserVerified } from '../../middleware/auth'
import type { Request, Response } from 'express'
import type { DeleteEpisodeErrorBody } from './validateSchema'
export default async function deleted(
  req: Request<any, any, DeleteEpisodeErrorBody & ExtBodyUserVerified>,
  res: Response<JsonResponse>
) {
  const { userVerified, ...deletedEpisodeError } = req.body
  const episodesError = await episodeErrorDb.deleteOne(deletedEpisodeError.link)
  if (!episodesError) {
    return res.status(400).json({ code: 400, ok: false, message: 'Error deleted episode', contents: null })
  }
  return res.status(200).json({
    code: 200,
    ok: true,
    message: ' episode deleted successfully',
    contents: {
      newToken: userVerified.newToken,
      deleted: true
    }
  })
}
