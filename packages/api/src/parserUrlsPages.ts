import { AnimeList, PagesUrlObject } from '../../types'
import { UpdateOneAnime, deletedOne, findAll } from './database/anime.db'
import log from './shared/log'

async function deletedEpisodesEmpty(anime: AnimeList) {
  const totalEpisodes = Object.keys(anime.episodes).length
  if (totalEpisodes === 0) {
    await deletedOne(anime.dataAnilist.id)
    log({
      type: 'info',
      message: '[parse url Pages] deleted anime with episodes empty',
      content: anime,
    })
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
      if (!episode.pagesUrl)
        log({
          type: 'warning',
          message: '[parse urlPages] pagesUrl no found',
          content: { numEpisode, episode, anime },
        })
      const pagesNames = Object.keys(episode.pagesUrl ?? {})
      let urlsPages: PagesUrlObject = {}
      if (!episode.updateEpisode) {
        log({
          type: 'warning',
          message: '[parse urlPages] updated episode no found',
          content: { numEpisode, episode, anime },
        })
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
  await log({
    type: 'info',
    message: `[parse urlPages] Parsed ${updated} of ${total} episodes`,
    content: {
      updated,
      totalepisode: total,
      totalAnime: animes.length,
    },
  })
  return
}
