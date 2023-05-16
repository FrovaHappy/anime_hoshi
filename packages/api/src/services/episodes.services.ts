import { Episodes } from '../../../types'
import { animeModel } from '../database/models/anime.model'
import Log from '../shared/log'

async function putEpisodesServices({ episodes, id }: { episodes: Episodes; id: number }) {
  const hasUpdated = await animeModel.findOneAndUpdate(
    { 'dataAnilist.id': id },
    { episodes: episodes },
    { upsert: false, returnDocument: 'after' }
  )
  if (hasUpdated) {
    await Log({
      type: 'warning',
      message: `episodes with id ${id} was put into the database`,
      content: { episodes, afterUpdate: hasUpdated },
    })
    return hasUpdated
  }
  return null
}

export default { put: putEpisodesServices }
