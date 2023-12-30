import { buildPages, updateAnilist } from './buildsProperties'
import mocks from '../../mocks'
const { anime } = mocks

describe('Test method buildPages', () => {
  test('new page', () => {
    const namePage = Object.keys(anime.pages)[0]
    const result = buildPages({ anime, namePage, lang: 'EN', defaultLang: 'JP' })
    const pages = result.pages
    expect(Object.keys(pages)).length(2)

    const page = pages[namePage + 'EN']
    expect(page.lastUpdate).toBe(0)
    expect(page.episodes).length(0)
    expect(page.startCount).toBe(0)
    expect(page.redirectId).toBeNull()
  })
  test('existing page', () => {
    const namePage = Object.keys(anime.pages)[0]
    const result = buildPages({ anime, namePage, lang: 'JP', defaultLang: 'JP' })
    const pages = result.pages
    expect(Object.keys(pages)).length(1)

    const page = pages[namePage]
    expect(page.lastUpdate).toBe(anime.pages[namePage].lastUpdate)
    expect(page.episodes).toBe(anime.pages[namePage].episodes)
    expect(page.startCount).toBe(anime.pages[namePage].startCount)
    expect(page.redirectId).toBe(anime.pages[namePage].redirectId)
  })
})

describe('Test method updateAnilist', () => {
  test('can update anilist', async () => {
    const result = await updateAnilist(anime)

    expect(result.lastUpdate !== 0).toBeTruthy()
  })
  test('can not update anilist', async () => {
    const time = Date.now()
    anime.lastUpdate = time
    const result = await updateAnilist(anime)
    expect(result.lastUpdate === time).toBeTruthy()
  })
})
