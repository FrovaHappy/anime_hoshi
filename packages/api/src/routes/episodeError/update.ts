import type { JsonResponse } from '../../../../types'
import episodeErrorDb from '../../database/episodeError.db'
import type { ExtBodyUserVerified } from '../../middleware/auth'
import type { Request, Response } from 'express'
import type { UpdateEpisodeErrorBody } from './validateSchema'
export default async function updated(
  req: Request<any, any, UpdateEpisodeErrorBody & ExtBodyUserVerified>,
  res: Response<JsonResponse>
) {
  const { userVerified, ...updateEpisodeError } = req.body
  const episodesError = await episodeErrorDb.updateOne(updateEpisodeError)
  if (!episodesError) {
    return res.status(400).json({ code: 400, ok: false, message: 'Error updating episode', contents: null })
  }
  return res.status(200).json({
    code: 200,
    ok: true,
    message: ' all episodes error successfully obtained',
    contents: {
      newToken: userVerified.newToken,
      episodesError
    }
  })
}
