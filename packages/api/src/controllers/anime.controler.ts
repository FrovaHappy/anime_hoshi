import { Request, Response } from 'express'
import { getAnimeListServices } from '../services/animeServices'
import { JsonResponse } from '../../../types'

export async function getAnimeListController(_req: Request, res: Response) {
  let { animeList, animesUpdated } = await getAnimeListServices()

  let response: JsonResponse = animeList
    ? {
        code: 200,
        message: 'Success Response',
        contents: { animes: animeList, animesUpdated },
      }
    : {
        code: 500,
        message: 'Cache Not Found',
        contents: null,
      }
  res.json(response).status(response.code)
}
