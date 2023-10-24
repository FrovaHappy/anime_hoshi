import buildEpisodes, { type ScrapPage } from './buildEpisodes'
import { PageContentHTML } from './buildEpisodes.mock'

const properties: ScrapPage = {
  url: 'https://www3.animeflv.net/',
  targetSelectorAll: 'unknown',
  titleSelector: 'unknown',
  episodeSelector: 'unknown',
  urlEpisodeSelector: 'unknown',
  episodePosition: 0,
  namePage: 'animeFlv',
  remplaceEpisode: [],
  remplaceTitle: []
}
const defaultResult = {
  passHTML: false,
  passTitleSelector: false,
  passTargetSelector: false,
  passEpisodeSelector: false,
  passEpisodePosition: false,
  passUrlEpisodeSelector: false
}

describe('scraping: build Episodes', () => {
  test('invalid Page Content HTML', async () => {
    const { validateResult } = await buildEpisodes(null, properties)
    expect(validateResult).toStrictEqual(defaultResult)
  })

  test('pass Page Content HTML', async () => {
    const { validateResult } = await buildEpisodes(PageContentHTML, properties)
    expect(validateResult.passHTML).toBe(true)
    expect(validateResult.passTargetSelector).toBe(false)
    expect(validateResult.passTitleSelector).toBe(false)
    expect(validateResult.passEpisodeSelector).toBe(false)
    expect(validateResult.passUrlEpisodeSelector).toBe(false)
  })

  test('pass Target Selector All', async () => {
    const newProperties = {
      targetSelectorAll: '.ListEpisodios > li'
    }
    const { validateResult } = await buildEpisodes(PageContentHTML, { ...properties, ...newProperties })

    expect(validateResult.passHTML).toBe(true)
    expect(validateResult.passTargetSelector).toBe(true)
  })

  test('pass Title Selector', async () => {
    const newProperties = {
      targetSelectorAll: '.ListEpisodios > li',
      titleSelector: '.Title'
    }
    const { validateResult } = await buildEpisodes(PageContentHTML, { ...properties, ...newProperties })

    expect(validateResult.passHTML).toBe(true)
    expect(validateResult.passTargetSelector).toBe(true)
    expect(validateResult.passTitleSelector).toBe(true)
    expect(validateResult.passEpisodeSelector).toBe(false)
    expect(validateResult.passUrlEpisodeSelector).toBe(false)
  })

  test('pass Episode Selector', async () => {
    const newProperties = {
      targetSelectorAll: '.ListEpisodios > li',
      episodeSelector: '.Capi'
    }
    const { validateResult } = await buildEpisodes(PageContentHTML, { ...properties, ...newProperties })

    expect(validateResult.passHTML).toBe(true)
    expect(validateResult.passTargetSelector).toBe(true)
    expect(validateResult.passEpisodeSelector).toBe(true)
    expect(validateResult.passTitleSelector).toBe(false)
    expect(validateResult.passUrlEpisodeSelector).toBe(false)
  })

  test('pass Episode Position and episodes length valid', async () => {
    const newProperties = {
      targetSelectorAll: '.ListEpisodios > li',
      episodePosition: -1,
      titleSelector: '.Title',
      episodeSelector: '.Capi',
      urlEpisodeSelector: 'a'
    }
    const { validateResult, episodes } = await buildEpisodes(PageContentHTML, { ...properties, ...newProperties })

    expect(validateResult.passHTML).toBe(true)
    expect(validateResult.passTargetSelector).toBe(true)
    expect(validateResult.passEpisodePosition).toBe(true)
    expect(validateResult.passTitleSelector).toBe(true)
    expect(validateResult.passUrlEpisodeSelector).toBe(true)

    expect(episodes.length > 0).toBe(true)
  })
  test('pass Url Episode Selector', async () => {
    const newProperties = {
      targetSelectorAll: '.ListEpisodios > li',
      urlEpisodeSelector: 'a'
    }
    const { validateResult } = await buildEpisodes(PageContentHTML, { ...properties, ...newProperties })

    expect(validateResult.passHTML).toBe(true)
    expect(validateResult.passTargetSelector).toBe(true)
    expect(validateResult.passUrlEpisodeSelector).toBe(true)
    expect(validateResult.passTitleSelector).toBe(false)
    expect(validateResult.passEpisodeSelector).toBe(false)
  })
})
