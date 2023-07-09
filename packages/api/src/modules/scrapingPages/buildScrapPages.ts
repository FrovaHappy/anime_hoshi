import { JSDOM } from 'jsdom'
import getHtml from './getHtml'
import { InfoEpisodeRecovered } from '../../../../types'
import { DataAttck } from '../../../type'
import { EpisodeNumber } from '../../Enum'
function remplaseString(str: string, rules: [searchValue: string | RegExp, remplaceValue: string][]) {
  for (const rule of rules) {
    const [searchValue, remplaceValue] = rule
    str = str.replace(searchValue, remplaceValue)
  }
  return str
}
export default async function buildScrapPages({
  urlPage,
  selectorEpisode,
  selectorEpisodes,
  selectorUrl,
  selectorTitle,
  namePages,
  positionEpisodeInString,
  testMode,
  remplaceEpisode = [],
  remplaceTitle = [],
}: DataAttck) {
  const testModeLog = (values: object) => {
    if (testMode) console.log(JSON.stringify(values) + '\n--------------------------------')
  }
  const { content, bodyError, error } = await getHtml(urlPage)
  testModeLog({ content, bodyError, error })
  if (!content) return null
  const { document: d } = new JSDOM(content).window

  const list = d.querySelectorAll(selectorEpisodes)
  if (testMode)
    d.querySelector(selectorEpisodes)
      ? console.log('selectorEpisodes was finding')
      : console.log('selectorEpisodes was not found')
  let scrapEpisodes: Array<InfoEpisodeRecovered> = []
  list.forEach((node) => {
    let url = node.getAttribute('href') ?? node.querySelector(selectorUrl)?.getAttribute('href')
    let title = node.querySelector(selectorTitle)?.textContent
    let episodeStr =
      node
        .querySelector(selectorEpisode)
        ?.textContent?.match(/[\w\d]+/g)
        ?.at(positionEpisodeInString) ?? ''
    episodeStr = remplaseString(episodeStr, remplaceEpisode)

    testModeLog({ title, url, episodeStr })
    if (!url || !title) return
    const UrlPage = new URL(urlPage)
    url = url?.includes(UrlPage.origin) ? url : UrlPage.origin + url

    title = remplaseString(title, [[/["]/g, ''], ...remplaceTitle])
    const episodeParse = (str: string) => {
      let episodeInt = parseInt(str)
      if (!Boolean(episodeInt)) episodeInt = EpisodeNumber.lastEpisodeNotFound
      return episodeInt
    }
    const episode = episodeParse(episodeStr)
    scrapEpisodes.push({ url, episode, title })
  })
  return { [namePages]: scrapEpisodes }
}
