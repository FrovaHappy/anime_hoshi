/* eslint-disable @typescript-eslint/no-non-null-assertion */
import fs from 'fs'
import path from 'path'
import { type Anime } from '../../../../types/Anime'
import joinEpisodes from './joinEpisodes'
import { type LangSupport, type ScrapEpisode } from '../../../../types/ScrapEpisode'
const anime: Anime = JSON.parse(fs.readFileSync(path.join(__dirname, '/anime.mock.json'), { encoding: 'utf8' }))
describe('Join Episodes', () => {
  const namePage = 'animeFlv'
  const { episode, link } = anime.pages[namePage].episodes[0]
  const title = anime.pages[namePage].title
  const lang: LangSupport = 'JP'
  const baseEpisode: ScrapEpisode = { episode, link, title, lang }

  test('when the scrap is equal', () => {
    const result = joinEpisodes({ anime, episodeScraper: baseEpisode, namePage })
    expect(result).toBeNull()
  })

  test('when the episode is different', () => {
    const episodeScraper = { title, episode: 2, lang, link }
    const result = joinEpisodes({
      episodeScraper,
      anime,
      namePage
    })
    const episodes = result!.pages[namePage].episodes
    expect(episodes).length(2)
    expect(episodes[0].episode).toBe(2)
    expect(episodes[0].link).toBe(link)
    expect(episodes[0].lastUpdate).toBeTypeOf('number')
    expect(episodes[1]).toEqual({ episode, link, lastUpdate: 0 })
  })
  test('when the link is different', () => {
    const linkModifier = '/linkModifier'
    const episodeScraper = { title, episode, lang, link: linkModifier }
    const result = joinEpisodes({
      episodeScraper,
      anime,
      namePage
    })
    const episodes = result!.pages[namePage].episodes
    expect(episodes).length(1)
    expect(episodes[0].episode).toBe(episode)
    expect(episodes[0].lastUpdate).toBeTypeOf('number')
    expect(episodes[0].link).toBe(linkModifier)
  })
})
