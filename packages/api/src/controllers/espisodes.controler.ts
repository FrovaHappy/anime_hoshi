import { Request, Response } from 'express'
import { Episodes } from '../../../types'
import episodesServices from '../services/episodes.services'
function parseEpisodes({ episodes }: { episodes: Episodes }) {
  try {
    let newEpisodes: Episodes = {}
    const exploitEpisodesNumber = Object.keys(episodes)
    exploitEpisodesNumber.forEach((EpisodesNum) => {
      const pagesNames = Object.keys(episodes[EpisodesNum]!.pagesUrl)
      let newUrlPages: { [x: string]: { url: string; update: number } } = {}
      pagesNames.forEach((pageName) => {
        const urlPages = episodes[EpisodesNum]!.pagesUrl[pageName]! as { url: string; update: number }
        newUrlPages[pageName] = {
          url: urlPages.url,
          update: urlPages.update,
        }
      })
      newEpisodes[EpisodesNum] = { updateEpisode: episodes[EpisodesNum]!.updateEpisode, pagesUrl: newUrlPages }
    })
    return newEpisodes
  } catch {
    return null
  }
}
export async function putEpisodes(req: Request, res: Response) {
  const episodes = parseEpisodes({ episodes: req.body.episodes })
  const id = req.body.id
  if (!episodes) return res.status(501).json({ status: 501, message: 'unexpected error, this is probably a bug.' })
  const hasUpdatedEpisodes = await episodesServices.put({ id: id, episodes: episodes })
  return hasUpdatedEpisodes
    ? res.status(201).json({ status: 201, anime: hasUpdatedEpisodes })
    : res.status(404).json({ status: 404, message: 'id does not exist or is not can edit' })
}
