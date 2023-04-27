import mongoose from 'mongoose'
import { AnimeList, EpisodesContent } from '../../../../types'
const { Schema, model } = mongoose

const episodesSchema = new Schema<EpisodesContent>(
  {
    updateEpisode: { type: 'number', required: true },
    pagesUrl: { type: Object, of: 'string', required: true, default: {} },
  },
  { _id: false, id: false }
)
const animeSchema = new Schema<AnimeList>(
  {
    dataAnilist: {
      id: { type: 'number', required: true },
      episodes: { type: 'number', required: true },
      format: { type: 'string', required: true },
      status: { type: 'string', required: true },
      description: { type: 'string', required: true },
      averageScore: { type: 'number', required: true },
      duration: { type: 'number', required: true },
      title: {
        english: { type: 'string', required: true },
        romaji: { type: 'string', required: true },
        native: { type: 'string', required: true },
        userPreferred: { type: 'string', required: true },
      },
      coverImage: {
        large: { type: 'string', required: true },
        medium: { type: 'string', required: true },
        color: { type: 'string', required: true },
      },
    },
    titleinPages: { type: Object, of: 'string', required: true },
    updateAnilist: { type: 'number', required: true },
    episodes: { type: Object, of: episodesSchema, required: true, default: {} },
    lastEpisodesOfTempPreview: { type: 'number', required: false },
  },
  { _id: false, id: false }
).set('toJSON', {
  transform: (_document, returnObject) => {
    delete returnObject._id
    delete returnObject.__v
  },
})

export const animeModel = model('Anime', animeSchema)
