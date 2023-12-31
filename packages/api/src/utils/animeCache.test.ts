import animesCache from './animesCache'

const animesIdsMock = [10, 11, 12, 13, 14, 15]
describe('Test AnimeCache', () => {
  test('set all the animes ids', () => {
    animesCache.setAll({ animesIds: animesIdsMock })
    const { animesIds } = animesCache.get()
    expect(animesIds).length(6)
  })
  test('set one id', () => {
    animesCache.set(1)
    const { animesIds, updated } = animesCache.get()
    expect(animesIds).length(7)
    expect(updated).toBeTruthy()
    expect(animesIds[0]).toBe(1)
  })
  test('set one id repite', () => {
    animesCache.set(13)
    const { animesIds, updated } = animesCache.get()
    expect(animesIds).length(7)
    expect(updated).toBeTruthy()
    expect(animesIds[0]).toBe(13)
  })
  test('set updated to false', () => {
    animesCache.setUpdated(false)
    const { updated } = animesCache.get()
    expect(updated).toBeFalsy()
  })
})
