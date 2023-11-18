import { errorEpisodeModel } from './models/episodesError.model'
import type { EpisodeError } from '../../../types/ScrapEpisode'
async function getOne(url: string) {
  return await errorEpisodeModel.findOne({ url })
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
  const update = await errorEpisodeModel.updateOne({ url: episodeError.url }, episodeError)
  if (update.matchedCount === 0) return null
  return update
}
async function deleteOne(url: string) {
  const deleted = await errorEpisodeModel.deleteOne({ url })
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
