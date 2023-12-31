import animeMinified from './animeMinified'
import mocks from '../../../mocks'
describe('Test Anime Minified', () => {
  const minified = animeMinified(mocks.anime)
  test('general structure', () => {
    expect(minified.color).toBe('#ffffff')
    expect(minified.episode).toBe(2)
    expect(minified.id).toBeTypeOf('number')
    expect(minified.image).toBeTypeOf('string')
    expect(minified.lastUpdate).toBeTypeOf('number')
  })
})
