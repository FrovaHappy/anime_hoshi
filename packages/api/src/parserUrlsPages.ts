import { AnimeList, PagesUrlObject } from '../../types'
import { UpdateOneAnime, deletedOne, findAll } from './database/anime.db'

async function deletedEpisodesEmpty(anime: AnimeList) {
  const totalEpisodes = Object.keys(anime.episodes).length
  if (totalEpisodes === 0) {
    await deletedOne(anime.dataAnilist.id)
    console.log('Deleted ' + anime.dataAnilist.id)
    return true
  }
  return false
}

export async function parserUrlsPages() {
  const animes = await findAll()
  let updated = 0
  let total = 0

  for await (const anime of animes) {
    const isDeletAnime = await deletedEpisodesEmpty(anime)
    if (isDeletAnime) continue
    const numEpisodes = Object.keys(anime.episodes)
    let urlUpdate = false
    let episodes = anime.episodes

    numEpisodes.forEach((numEpisode) => {
      let episode = anime.episodes[numEpisode]!
      if (!episode.pagesUrl) console.error({ error: 'pages url no found', id: anime.dataAnilist.id, numEpisode })
      const pagesNames = Object.keys(episode.pagesUrl ?? {})
      let urlsPages: PagesUrlObject = {}
      if (!episode.updateEpisode) {
        console.error({ error: 'updated episode no found', id: anime.dataAnilist.id })
        urlUpdate = true
        episode.updateEpisode = Date.now()
        episodes[numEpisode] = episode
      }

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
