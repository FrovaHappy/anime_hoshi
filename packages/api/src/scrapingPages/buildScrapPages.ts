import { JSDOM } from 'jsdom'
import getHtml from './getHtml'
import { InfoEpisodeRecovered } from '../../../types'
import { DataAttck } from '../../type'

export default async function buildScrapPages({
  urlPage,
  selectorEpisode,
  selectorEpisodes,
  selectorUrl,
  selectorTitle,
  namePages,
  positionEpisodeInString,
  testMode,
}: DataAttck) {
  const testModeLog = (values: object) => {
    if (testMode) console.log(JSON.stringify({ ...values }) + '\n--------------------------------')
  }
  const { content } = await getHtml(urlPage)
  if (!content) return null
  testModeLog({ content })
  const { document: d } = new JSDOM(content).window

  const list = d.querySelectorAll(selectorEpisodes)
  let scrapEpisodes: Array<InfoEpisodeRecovered> = []
  list.forEach((node) => {
    let url = node.getAttribute('href') ?? node.querySelector(selectorUrl)?.getAttribute('href')
    const title = node.querySelector(selectorTitle)?.textContent
    const episode = parseInt(
      node
        .querySelector(selectorEpisode)
        ?.textContent?.match(/[\w\d]+/g)
        ?.at(positionEpisodeInString) ?? ''
    )
    testModeLog({ title, url, episode })
    if (!url || !title) return
    url = url?.includes(urlPage) ? url : urlPage + url?.slice(1)

    scrapEpisodes.push({ url, episode, title })
  })
  return { [namePages]: scrapEpisodes }
}
