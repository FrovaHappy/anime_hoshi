import { Request, Response } from 'express'
import { getAnimeListServices } from '../services/animeServices'

export async function getAnimeListController(_req: Request, res: Response) {
  let animeList = await getAnimeListServices()
  res.json(animeList).status(200)
}
