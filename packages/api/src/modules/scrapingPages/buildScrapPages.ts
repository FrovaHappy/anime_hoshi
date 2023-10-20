import { JSDOM } from 'jsdom'
import getHtml from './getHtml'
import type { InfoEpisodeRecovered } from '../../../../types'
import type { DataAttck } from '../../../type'
import { EpisodeNumber } from '../../Enum'
function remplaceString (str: string, rules: Array<[searchValue: string | RegExp, remplaceValue: string]>) {
  for (const rule of rules) {
    const [searchValue, remplaceValue] = rule
    str = str.replace(searchValue, remplaceValue)
  }
  return str
}
export default async function buildScrapPages ({
  urlPage,
  selectorEpisode,
  selectorEpisodes,
  selectorUrl,
  selectorTitle,
  namePages,
  positionEpisodeInString,
  remplaceEpisode = [],
  remplaceTitle = []
}: DataAttck) {
  const { content } = await getHtml(urlPage)
  if (!content) return null
  const { document: d } = new JSDOM(content).window

  const list = d.querySelectorAll(selectorEpisodes)

  const scrapEpisodes: InfoEpisodeRecovered[] = []
  list.forEach(node => {
    let url = node.getAttribute('href') ?? node.querySelector(selectorUrl)?.getAttribute('href')
    let title = node.querySelector(selectorTitle)?.textContent
    let episodeStr =
      node
        .querySelector(selectorEpisode)
        ?.textContent?.match(/[\w\d]+/g)
        ?.at(positionEpisodeInString) ?? ''
    episodeStr = remplaceString(episodeStr, remplaceEpisode)

    if (!url || !title) return
    const UrlPage = new URL(urlPage)
    url = url?.includes(UrlPage.origin) ? url : UrlPage.origin + url

    title = remplaceString(title, [[/["]/g, ''], ...remplaceTitle])
    const episodeParse = (str: string) => {
      let episodeInt = parseInt(str)
      if (isNaN(episodeInt)) episodeInt = EpisodeNumber.lastEpisodeNotFound
      return episodeInt
    }
    const episode = episodeParse(episodeStr)
    scrapEpisodes.push({ url, episode, title })
  })
  return { [namePages]: scrapEpisodes }
}
