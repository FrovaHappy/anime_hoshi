/* eslint-disable @typescript-eslint/no-non-null-assertion */
import mocks from '../../mocks'
import joinEpisodes from './joinEpisodes'
import { type LangSupport, type ScrapEpisode } from '../../../../types/ScrapEpisode'
import { copyDeepObject } from '../../utils/general'

const { anime } = mocks
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
    const episodeScraper = { title, episode: 3, lang, link }
    const result = joinEpisodes({ episodeScraper, anime, namePage, defaultLang })
    const episodes = result!.pages[namePage].episodes
    expect(episodes).length(3)
    expect(episodes[0].episode).toBe(3)
    expect(episodes[0].link).toBe(link)
    expect(episodes[0].lastUpdate).toBeTypeOf('number')
    expect(episodes[1]).toEqual({ episode, link, lastUpdate: 1 })
  })
  test('when the link is different', () => {
    const linkModifier = '/linkModifier'
    const episodeScraper = { title, episode, lang, link: linkModifier }
    const result = joinEpisodes({ episodeScraper, anime, namePage, defaultLang })
    const episodes = result!.pages[namePage].episodes
    expect(episodes).length(2)
    expect(episodes[0].episode).toBe(episode)
    expect(episodes[0].lastUpdate).toBeTypeOf('number')
    expect(episodes[0].link).toBe(linkModifier)
  })
  test('when the anime.startCount is 10 and ep is 13', () => {
    const animeCopy = copyDeepObject(anime)
    animeCopy.pages[namePage].startCount = 10
    const episodeScraper: ScrapEpisode = { episode: 13, lang, link, title }
    const result = joinEpisodes({ episodeScraper, anime: animeCopy, namePage, defaultLang })
    expect(result).not.toBeNull()
    const episodes = result!.pages[namePage].episodes
    expect(episodes).length(3)
    expect(episodes[0].episode).toBe(3)
    expect(episodes[0].link).toBe(link)
  })
  test('when the anime.startCount is 10 and ep is 11', () => {
    const animeCopy = copyDeepObject(anime)
    animeCopy.pages[namePage].startCount = 10
    const episodeScraper: ScrapEpisode = { episode: 11, lang, link, title }
    const result = joinEpisodes({ episodeScraper, anime: animeCopy, namePage, defaultLang })
    expect(result).toBeNull()
  })
  test('when the episode is -1 (lastEpisode)', () => {
    const episodeScraper = { title, episode: -1, lang, link }
    const result = joinEpisodes({ episodeScraper, anime, namePage, defaultLang })
    const episodes = result!.pages[namePage].episodes
    expect(episodes).length(3)
    expect(episodes[0].episode).toBe(13)
    expect(episodes[0].link).toBe(link)
    expect(episodes[0].lastUpdate).toBeTypeOf('number')
    expect(episodes[1]).toEqual({ episode, link, lastUpdate: 1 })
  })
  test('when the episode is -1 (lastEpisode) and a.episodes is null', () => {
    const animeCopy = copyDeepObject(anime)
    const episodeScraper = { title, episode: -1, lang, link }
    animeCopy.episodes = null
    const result = joinEpisodes({ episodeScraper, anime: animeCopy, namePage, defaultLang })
    expect(result).toBeNull()
  })
})
