import type { Request, Response } from 'express'
import { type JsonResponse } from '../../../../../types'
import { type DeleteAnime } from '../validatorSchema'
import { type ExtBodyUserVerified } from '../../../middleware/auth'
import animeDb from '../../../database/anime.db'
type AnimesReq = Request<unknown, unknown, DeleteAnime & ExtBodyUserVerified>
export default async function deletePath(req: AnimesReq, res: Response<JsonResponse>) {
  const { userVerified, ...body } = req.body

  const result = await animeDb.deletedOne(body.id)

  if (result.deletedCount === 0) {
    return res.status(404).json({
      code: 404,
      message: 'delete id not found',
      contents: {
        newToken: userVerified.newToken,
        id: body.id
      },
      ok: false
    })
  }

  return res.status(200).json({
    code: 200,
    message: 'delete successfully',
    contents: {
      newToken: userVerified.newToken
    },
    ok: true
  })
}
