/* eslint-disable @typescript-eslint/no-non-null-assertion */
import fs from 'fs'
import path from 'path'
import { type Anime } from '../../../../types/Anime'
import joinEpisodes from './joinEpisodes'
import { type LangSupport, type ScrapEpisode } from '../../../../types/ScrapEpisode'
import { copyDeepObject } from '../../utils/general'
const anime: Anime = JSON.parse(fs.readFileSync(path.join(__dirname, '/anime.mock.json'), { encoding: 'utf8' }))
describe('Join Episodes', () => {
  const namePage = 'animeFlv'
  const { episode, link } = anime.pages[namePage].episodes[0]
  const title = 'not necessary'
  const lang: LangSupport = 'JP'
  const defaultLang = 'JP'
  const baseEpisode: ScrapEpisode = { episode, link, title, lang }

  test('when the scrap is equal', () => {
    const result = joinEpisodes({ anime, episodeScraper: baseEpisode, namePage, defaultLang })
    expect(result).toBeNull()
  })

  test('when the episode is different', () => {
    const episodeScraper = { title, episode: 2, lang, link }
    const result = joinEpisodes({ episodeScraper, anime, namePage, defaultLang })
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
    const result = joinEpisodes({ episodeScraper, anime, namePage, defaultLang })
    const episodes = result!.pages[namePage].episodes
    expect(episodes).length(1)
    expect(episodes[0].episode).toBe(episode)
    expect(episodes[0].lastUpdate).toBeTypeOf('number')
    expect(episodes[0].link).toBe(linkModifier)
  })
  test('when the anime.startCount is 7 and ep is 9', () => {
    const animeCopy = copyDeepObject(anime)
    animeCopy.pages[namePage].startCount = 7
    const episodeScraper: ScrapEpisode = { episode: 9, lang, link, title }
    const result = joinEpisodes({ episodeScraper, anime: animeCopy, namePage, defaultLang })
    expect(result).not.toBeNull()
    const episodes = result!.pages[namePage].episodes
    expect(episodes).length(2)
    expect(episodes[0].episode).toBe(2)
    expect(episodes[0].link).toBe(link)
  })
  test('when the anime.startCount is 7 and ep is 8', () => {
    const animeCopy = copyDeepObject(anime)
    animeCopy.pages[namePage].startCount = 7
    const episodeScraper: ScrapEpisode = { episode: 8, lang, link, title }
    const result = joinEpisodes({ episodeScraper, anime: animeCopy, namePage, defaultLang })
    expect(result).toBeNull()
  })
})
