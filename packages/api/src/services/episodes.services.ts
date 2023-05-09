import { Episodes } from '../../../types'
import { animeModel } from '../database/models/anime.model'

async function putEpisodesServices({ episodes, id }: { episodes: Episodes; id: number }) {
  const hasUpdated = await animeModel.findOneAndUpdate(
    { 'dataAnilist.id': id },
    { episodes: episodes },
    { upsert: false, returnDocument: 'after' }
  )
  console.log(hasUpdated)
  return hasUpdated ? hasUpdated : null
}

export default { put: putEpisodesServices }
