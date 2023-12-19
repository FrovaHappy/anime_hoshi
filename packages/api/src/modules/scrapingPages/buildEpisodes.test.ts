import { type ValidateResult, type ScrapPage } from '../../../../types/ScrapEpisode'
import buildEpisodes from './buildEpisodes'
import fs from 'fs'
import path from 'path'

const PageContentHTML = fs.readFileSync(path.join(__dirname, '/mockPage.txt'), { encoding: 'utf8' })

const properties: ScrapPage = {
  url: 'https://www3.animeflv.net/',
  targetSelectorAll: 'unknown',
  titleSelector: 'unknown',
  episodeSelector: 'unknown',
  urlEpisodeSelector: 'unknown',
  episodePosition: 0,
  defaultLang: 'JP',
  langSelector: '',
  langsCases: [],
  namePage: 'animeFlv',
  remplaceEpisode: [],
  remplaceTitle: [],
  validatesResults: []
}
export const propertiesSuccess: ScrapPage = {
  url: 'https://www3.animeflv.net/',
  targetSelectorAll: '.episodes',
  titleSelector: 'h3',
  episodeSelector: 'h4',
  urlEpisodeSelector: 'a',
  episodePosition: -1,
  defaultLang: 'JP',
  langSelector: '.quality',
  langsCases: [
    { lang: 'ES', find: 'Audio Latino' },
    { lang: 'ES', find: 'Castellano' },
    { lang: 'ES', find: 'Multi Audio' }
  ],
  namePage: 'animeFlv',
  remplaceEpisode: [],
  remplaceTitle: [],
  validatesResults: []
}
const defaultResult: ValidateResult = {
  passHTML: false,
  passTitleSelector: false,
  passTargetSelector: false,
  passEpisodeSelector: false,
  passEpisodePosition: false,
  passUrlEpisodeSelector: false,
  passLangSelector: false,
  timestamp: 0
}

describe('scraping: build Episodes', () => {
  test('invalid Page Content HTML', async () => {
    const { validateResult } = await buildEpisodes(null, properties)
    validateResult.timestamp = 0
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
      targetSelectorAll: propertiesSuccess.targetSelectorAll
    }
    const { validateResult } = await buildEpisodes(PageContentHTML, { ...properties, ...newProperties })

    expect(validateResult.passHTML).toBe(true)
    expect(validateResult.passTargetSelector).toBe(true)
  })

  test('pass All Selector', async () => {
    const { validateResult } = await buildEpisodes(PageContentHTML, propertiesSuccess)

    expect(validateResult.passHTML).toBe(true)
    expect(validateResult.passTargetSelector).toBe(true)
    expect(validateResult.passTitleSelector).toBe(true)
    expect(validateResult.passEpisodeSelector).toBe(true)
    expect(validateResult.passUrlEpisodeSelector).toBe(true)
    expect(validateResult.timestamp !== 0).toBeTruthy()
    expect(validateResult.passLangSelector).toBeTruthy()
    expect(validateResult.passEpisodePosition).toBeTruthy()
  })
  test('pass Find Langs Cases', async () => {
    const { episodes } = await buildEpisodes(PageContentHTML, propertiesSuccess)

    expect(episodes.length).toBe(30)
    expect(episodes.filter(ep => ep.lang === 'ES').length).toBe(9)
  })
})
