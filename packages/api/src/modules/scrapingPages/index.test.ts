import { BuildData } from '.'
import ScrapPagesDb from '../../database/scrapPages.db'
import { mongoose } from '../../mongoose'

describe('testing BuildPage Result Function', async () => {
  await mongoose()
  const query = await ScrapPagesDb.getAll()
  test('there is content in scrapPages', () => {
    expect(query.length > 0).toBeTruthy()
  })
  const result = await BuildData(query[0])
  test('test result', () => {
    expect(typeof result.namePage === 'string').toBeTruthy()
    expect(result.episodes.length >= 0).toBeTruthy()
    result.episodes.forEach(episodes => {
      expect(episodes.episode).toBeTypeOf('number')
      expect(episodes.lang).toBeTypeOf('string')
      expect(episodes.title).toBeTypeOf('string')
      expect(episodes.link).toBeTypeOf('string')
    })
  })
})
