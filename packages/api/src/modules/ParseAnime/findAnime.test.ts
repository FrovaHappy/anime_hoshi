/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type Anime } from '../../../../types/Anime'
import animeDb from '../../database/anime.db'
import { mongoose } from '../../mongoose'
import findAnime, { OperationTypeEnum } from './findAnime'
import fs from 'fs'
import path from 'path'
const anime: Anime = JSON.parse(fs.readFileSync(path.join(__dirname, '/anime.mock.json'), { encoding: 'utf8' }))

const titles = [
  '', // for anime empty
  'Ahiru Riku Sentai' // for new anime
]
const namePage = 'animeFlv'
const defaultLang = 'JP'
const lang = 'JP'

describe('Find Anime', async () => {
  await mongoose()
  test('anime no found', async () => {
    const result = await findAnime({ lang, namePage, title: titles[0], defaultLang })
    expect(result).toBeNull()
  })
  test('anime found NEW', async () => {
    const result = await findAnime({ lang, namePage, defaultLang, title: titles[1] })
    const page = result!.anime.pages.animeFlv
    expect(result).not.toBeNull()
    expect(Object.keys(result!.anime.pages)).length(1)
    expect(result!.operationType).toBe(OperationTypeEnum.NEW)
    expect(page.episodes).length(0)
    expect(page.lastUpdate).toBe(0)
    expect(page.startCount).toBe(0)
    expect(page.redirectId).toBeNull()
    expect(page.title).toBe(titles[1])

    await animeDb.deletedOne(result!.anime.dataAnilist.id)
  })
  test('anime found ORIGINAL', async () => {
    await animeDb.updateOne({ anime, filter: {} })
    const result = await findAnime({ lang, namePage, defaultLang, title: anime.pages.animeFlv.title })
    expect(result).not.toBeNull()
    expect(Object.keys(result!.anime.pages)).length(1)
    expect(result!.operationType).toBe(OperationTypeEnum.ORIGINAL)

    await animeDb.deletedOne(result!.anime.dataAnilist.id)
  })
})
