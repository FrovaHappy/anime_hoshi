import { JSDOM } from 'jsdom'
import { EpisodeNumber } from '../../Enum'
import type { ValidateResult, ScrapEpisode, ScrapPage } from '../../../../types/ScrapEpisode'

function remplaceString(str: string, rules: Array<[searchValue: string | RegExp, remplaceValue: string]>) {
  for (const rule of rules) {
    const [searchValue, remplaceValue] = rule
    str = str.replace(searchValue, remplaceValue)
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
  const validateResult = {
    passHTML: false,
    passTitleSelector: false,
    passTargetSelector: false,
    passEpisodeSelector: false,
    passEpisodePosition: false,
    passUrlEpisodeSelector: false,
    timestamp: Date.now()
  }
  if (content === null) return { validateResult, episodes: [] }
  const { document: d } = new JSDOM(content).window
  const list = d.querySelectorAll(properties.targetSelectorAll)

  if (d) validateResult.passHTML = true
  if (list.length > 0) validateResult.passTargetSelector = true

  const episodes: ScrapEpisode[] = []
  list.forEach(node => {
    let url = node.getAttribute('href') ?? node.querySelector(properties.urlEpisodeSelector)?.getAttribute('href')
    let title = node.querySelector(properties.titleSelector)?.textContent
    let episodeStr = node
      .querySelector(properties.episodeSelector)
      ?.textContent?.match(/[\w\d]+/g)
      ?.at(properties.episodePosition)
    if (typeof episodeStr === 'string') validateResult.passEpisodeSelector = true
    episodeStr = remplaceString(episodeStr ?? '', properties.remplaceEpisode)

    if (title) validateResult.passTitleSelector = true
    if (url) validateResult.passUrlEpisodeSelector = true

    if (!url || !title) return

    const UrlPage = new URL(properties.url)
    url = url.includes(UrlPage.origin) ? url : UrlPage.origin + url
    title = remplaceString(title, [[/["]/g, ''], ...properties.remplaceTitle])
    const episode = episodeParse(episodeStr)
    if (episode >= 0) validateResult.passEpisodePosition = true
    episodes.push({ url, episode, title })
  })
  return { validateResult, episodes }
}
