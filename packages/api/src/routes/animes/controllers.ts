import { Request, Response } from 'express'
import { getData } from './services'
import { JsonResponse } from '../../../../types'
export async function getAnimes(req: Request, res: Response) {
  const id = parseInt(req.query.id?.toLocaleString() ?? '')

  const { animes, animesUpdated, animesMinified } = getData()
  if (!animes)
    return res.status(500).json({ code: 500, message: 'resources not yet loaded', contents: null } as JsonResponse)
  if (!isNaN(id)) {
    const anime = animes.find((anime) => anime.dataAnilist.id === id)
    return anime
      ? res.status(200).json({ code: 200, contents: anime, message: 'anime found :)' } as JsonResponse)
      : res.status(404).json({ code: 404, contents: null, message: 'anime not found' } as JsonResponse)
  }
  return res.status(200).json({
    code: 200,
    contents: { animes: [...animesMinified], lastUpdate: animesUpdated },
    message: 'animes collections here',
  } as JsonResponse)
}
