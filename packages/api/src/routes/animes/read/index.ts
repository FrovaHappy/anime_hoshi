import type { Request, Response } from 'express'
import { getData } from '../read/services'
import type { JsonResponse } from '../../../../../types'
export default async function getAnimes (req: Request, res: Response<JsonResponse>) {
  const id = parseInt(req.query.id?.toString() ?? '')

  const { animes, animesUpdated, animesMinified } = getData()
  if (animes == null) return res.status(500).json({ code: 500, message: 'resources not yet loaded', contents: null })
  if (!isNaN(id)) {
    const anime = animes.find(anime => anime.dataAnilist.id === id)
    return (anime != null)
      ? res.status(200).json({ code: 200, contents: anime, message: 'anime found :)' })
      : res.status(404).json({ code: 404, contents: null, message: 'anime not found' })
  }
  return res.status(200).json({
    code: 200,
    contents: { animes: [...animesMinified], lastUpdate: animesUpdated },
    message: 'animes collections here'
  })
}
