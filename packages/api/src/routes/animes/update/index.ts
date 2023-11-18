import type { JsonResponse } from '../../../../../types'
import { namePages } from '../../../Enum'
import { createRedirectId, updateGeneral } from './services'
import type { UpdateAnimeBodyType } from '../validatorSchema'
import type { Request, Response } from 'express'

type AnimesReq = Request<unknown, unknown, UpdateAnimeBodyType>

export default async function putAnimes(req: AnimesReq, res: Response<JsonResponse>) {
  const putAnime = req.body
  const existNamePage = namePages.some(namePage => namePage === putAnime.namePage)
  if (!existNamePage) {
    return res.status(400).json({
      code: 400,
      message: 'check the name of the page:' + namePages.join(', '),
      contents: { namePage: putAnime.namePage, namePages },
      ok: false
    })
  }
  if (putAnime.redirectId) {
    const anime = await createRedirectId(putAnime)
    if (anime == null) {
      return res.status(400).json({
        code: 400,
        message: 'redirect not found, checks that the provided id exists in anilist',
        contents: { redirectId: putAnime.redirectId },
        ok: false
      })
    }
    return res.status(200).json({
      code: 201,
      message: 'created or updated anime provided in redirect id',
      contents: anime.toJSON(),
      ok: true
    })
  }
  const anime = await updateGeneral(putAnime)
  if (anime == null) {
    return res.status(400).json({
      code: 400,
      message: 'anime not found in db',
      contents: { id: putAnime.id },
      ok: false
    })
  }
  return res.status(201).json({ code: 201, ok: true, message: 'anime updated', contents: anime.toJSON() })
}
