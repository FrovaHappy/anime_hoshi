import { errorEpisodeModel } from './models/episodesError.model'
import type { EpisodeError } from '../../../types/ScrapEpisode'
async function getOne(link: string) {
  return await errorEpisodeModel.findOne({ link })
}
async function getAll() {
  return await errorEpisodeModel.find({})
}
async function createOrUpdate(episodeError: Partial<EpisodeError>) {
  try {
    return await errorEpisodeModel.create(episodeError)
  } catch {
    return await updateOne(episodeError)
  }
}
async function updateOne(episodeError: Partial<EpisodeError>) {
  const update = await errorEpisodeModel.updateOne({ link: episodeError.link }, episodeError)
  if (update.matchedCount === 0) return null
  return update
}
async function deleteOne(link: string) {
  const deleted = await errorEpisodeModel.deleteOne({ link })
  if (deleted.deletedCount === 0) return null
  return deleted
}

export default {
  getAll,
  createOrUpdate,
  updateOne,
  deleteOne,
  getOne
}
