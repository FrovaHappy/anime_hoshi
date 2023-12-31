import type { Request, Response } from 'express'
import { getAnimesMinified } from '../read/services'
import type { JsonResponse } from '../../../../../types'
import animeDb from '../../../database/anime.db'
export default async function getAnimes(req: Request, res: Response<JsonResponse>) {
  const id = parseInt(req.query.id?.toString() ?? '')

  if (!isNaN(id)) {
    const anime = await animeDb.findOne({ search: id, searchType: 'id' })
    return anime != null
      ? res.status(200).json({ code: 200, ok: true, contents: anime, message: 'anime found :)' })
      : res.status(404).json({ code: 404, ok: false, contents: null, message: 'anime not found' })
  }
  const { lastUpdate, animesMinified } = getAnimesMinified()
  return res.status(200).json({
    code: 200,
    contents: { animes: animesMinified, lastUpdate },
    message: 'animes collections here',
    ok: true
  })
}
