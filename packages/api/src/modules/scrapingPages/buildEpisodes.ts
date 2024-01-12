import { JSDOM } from 'jsdom'
import { EpisodeNumber } from '../../Enum'
import type { ValidateResult, ScrapEpisode, ScrapPage } from '../../../../types/ScrapEpisode'

function remplaceString(str: string, rules: Array<[searchValue: string | RegExp, remplaceValue: string]>) {
  for (const rule of rules) {
    const [searchValue, remplaceValue] = rule
    str = str.replace(new RegExp(searchValue, 'g'), remplaceValue)
  }
  return str
}
const episodeParse = (str: string) => {
  let episodeInt = parseInt(str)
  if (isNaN(episodeInt)) episodeInt = EpisodeNumber.lastEpisodeNotFound
  return episodeInt
}

interface Result {
  validateResult: ValidateResult
  episodes: ScrapEpisode[]
}
export default async function buildEpisodes(content: string | null, properties: ScrapPage): Promise<Result> {
  const validateResult: ValidateResult = {
    passHTML: false,
    passTitleSelector: false,
    passTargetSelector: false,
    passEpisodeSelector: false,
    passEpisodePosition: false,
    passUrlEpisodeSelector: false,
    timestamp: Date.now(),
    passLangSelector: false
  }
  if (content === null) return { validateResult, episodes: [] }
  const { document: d } = new JSDOM(content).window
  const list = d.querySelectorAll(properties.targetSelectorAll)

  if (d) validateResult.passHTML = true
  if (list.length > 0) validateResult.passTargetSelector = true

  const episodes: ScrapEpisode[] = []
  list.forEach(node => {
    const getLang = () => {
      let lang = properties.defaultLang
      const el = node.querySelector(properties.langSelector)

      if (!el) return lang
      validateResult.passLangSelector = true
      properties.langsCases.forEach(prop => {
        if (el.textContent?.includes(prop.find)) lang = prop.lang
      })
      return lang
    }
    const getUrl = () => {
      let url = node.getAttribute('href') ?? node.querySelector(properties.urlEpisodeSelector)?.getAttribute('href')
      if (!url) return null
      const UrlPage = new URL(properties.url)
      validateResult.passUrlEpisodeSelector = true

      url = url.includes(UrlPage.origin) ? url : UrlPage.origin + url
      return url
    }
    const getTitle = () => {
      let title = node.querySelector(properties.titleSelector)?.textContent
      if (!title) return null
      validateResult.passTitleSelector = true

      title = remplaceString(title, [[/["]/g, ''], ...properties.remplaceTitle])
      return title
    }
    const getEpisode = () => {
      let episodeStr = node
        .querySelector(properties.episodeSelector)
        ?.textContent?.match(/[\w\d]+/g)
        ?.at(properties.episodePosition)
      if (typeof episodeStr === 'string') validateResult.passEpisodeSelector = true
      episodeStr = remplaceString(episodeStr ?? '', properties.remplaceEpisode)

      const episode = episodeParse(episodeStr)
      if (episode >= 0) validateResult.passEpisodePosition = true
      return episode
    }
    const url = getUrl()
    const title = getTitle()
    if (!title || !url) return
    episodes.push({ link: url, episode: getEpisode(), title, lang: getLang() })
  })
  return { validateResult, episodes }
}
