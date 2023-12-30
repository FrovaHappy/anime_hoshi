/* eslint-disable @typescript-eslint/no-non-null-assertion */
import animeDb from '../../database/anime.db'
import { mongoose } from '../../mongoose'
import findAnime from './findAnime'
import mocks from '../../mocks'
const { anime } = mocks

describe('Find Anime', async () => {
  await mongoose()
  await animeDb.deletedOne(anime.id)

  test('anime no found', async () => {
    const result = await findAnime({ title: 'n0F0und' })
    console.log(result)
    expect(result).toBeNull()
  })
  test('anime found in Db', async () => {
    await animeDb.updateOne({ anime, filter: {} })
    const result = await findAnime({ title: anime.titles[0] })
    expect(result).not.toBeNull()
    expect(result!.titles).length(1)
    expect(result!.lastUpdate).toBe(0)

    await animeDb.deletedOne(result!.id)
  })

  test('anime found in fetchAnilist', async () => {
    await animeDb.updateOne({ anime, filter: {} })
    const result = await findAnime({ title: 'GIRLS Bravo: season second' })
    expect(result).not.toBeNull()
    expect(result!.titles).length(2)
    expect(result!.lastUpdate !== 0).toBeTruthy()

    await animeDb.deletedOne(result!.id)
  })
})
