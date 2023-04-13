import { PagesUrlObject } from '../../types'
import { UpdateOneAnime, findAll } from './database/anime.db'

export async function parserUrlsPages() {
  const animes = await findAll()
  let updated = 0
  let total = 0

  for await (const anime of animes) {
    const numEpisodes = Object.keys(anime.episodes)
    let urlUpdate = false
    let episodes = anime.episodes
    numEpisodes.forEach((numEpisode) => {
      let episode = anime.episodes[numEpisode]!
      const pagesNames = Object.keys(episode.pagesUrl)
      let urlsPages: PagesUrlObject = {}

      pagesNames.forEach((pageName) => {
        let urlPage = episode.pagesUrl[pageName]!

        if (typeof urlPage === 'string') {
          urlUpdate = true
          urlPage = {
            url: urlPage,
            update: episode.updateEpisode,
          }
          urlsPages[pageName] = urlPage
        }
      })
      episode.pagesUrl = urlsPages
      episodes[numEpisode] = episode
    })
    if (urlUpdate) {
      updated++
      anime.episodes = episodes
      await UpdateOneAnime(anime)
    }
    total++
  }
  return {
    updated,
    totalepisode: total,
    totalAnime: animes.length,
  }
}
