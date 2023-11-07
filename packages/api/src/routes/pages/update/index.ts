import { type JsonResponse } from '../../../../../types'
import scrapPagesDb, { type ScrapPageResponse } from '../../../database/scrapPages.db'
import { type ExtBodyUserVerified } from '../../../middleware/auth'
import { BuildData } from '../../../modules/scrapingPages'
import remove from '../../../utils/removeRecursive'
import { type UpdatePagesBody } from '../validateSchema'
import type { Response, Request } from 'express'
import parseAnimes from '../../../modules/ParseAnime'

export default async function update(
  req: Request<any, any, UpdatePagesBody & ExtBodyUserVerified>,
  res: Response<JsonResponse>
) {
  const { userVerified, ...body } = req.body
  const bodyParsed = remove<Partial<ScrapPageResponse>>(body)
  console.log(bodyParsed)
  const result = await scrapPagesDb.updateOne({ namePage: body.namePage }, body)

  if (result.matchedCount === 0 || result.modifiedCount === 0) {
    return res.status(401).json({
      code: 401,
      message: 'no se a encontrado ninguna pagina con' + body.namePage,
      ok: false,
      contents: { newToken: userVerified.newToken, result }
    })
  }
  const getPage = await scrapPagesDb.getOne({ namePage: body.namePage })
  if (getPage) {
    const page = await BuildData(getPage)
    await parseAnimes([page])
  }

  return res.status(200).json({
    code: 200,
    message: 'updated successfully',
    ok: true,
    contents: { newToken: userVerified.newToken, result }
  })
}
