import mongoose from 'mongoose'
import { type Episode, type Anime, type Page } from '../../../../types/Anime'
const { Schema, model } = mongoose

const episodeSchema = new Schema<Episode>(
  {
    episode: { type: 'number', required: true },
    lastUpdate: { type: 'number', required: true },
    link: { type: 'string', required: true },
  },
  { _id: false, id: false }
)
const pageScchema = new Schema<Page>(
  {
    episodes: { type: Object, of: episodeSchema, required: true, default: {} },
    lastUpdate: { type: 'number', required: true },
    redirectId: { type: 'number', required: true },
    startCount: { type: 'number', required: true },
    title: { type: 'string', required: true },
  },
  { _id: false, id: false }
)
const animeSchema = new Schema<Anime>(
  {
    dataAnilist: {
      id: { type: 'number', required: true },
      lastUpdated: { type: 'number', required: true },
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
    pages: { type: Object, of: pageScchema, required: true, default: {} },
  },
  { _id: false, id: false }
).set('toJSON', {
  transform: (_document, returnObject) => {
    delete returnObject._id
    delete returnObject.__v
  },
})

export const animeModel = model('Anime', animeSchema)
