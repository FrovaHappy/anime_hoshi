import fs from 'fs'
import path from 'path'
import { type Episode, type Anime } from '../../../../types/Anime'
import joinEpisodes from './joinEpisodes'
import { type ScrapEpisode } from '../../../../types/ScrapEpisode'
const anime: Anime = JSON.parse(fs.readFileSync(path.join(__dirname, '/anime.mock.json'), { encoding: 'utf8' }))
describe('Join Episodes', () => {
  test('', () => {
    const { episode, link } = anime.pages.animeFlv.episodes[0]
    const baseEpisode: ScrapEpisode = { episode, link, title: anime.pages.animeFlv.title, lang: 'JP' }
    const result = joinEpisodes({ anime, episodeScraper: baseEpisode, namePage: 'AnimeFlv' })
    expect(Object.keys(result.pages)).length(2)
    expect(result.pages.animeFlv.episodes[0]).toEqual({ episode, link, lastUpdate: 0 } satisfies Episode)
  })
})
