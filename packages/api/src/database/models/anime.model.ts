import mongoose from 'mongoose'
import { type Episode, type Anime, type Page } from '../../../../types/Anime'
const { Schema, model } = mongoose

const episodeSchema = new Schema<Episode>(
  {
    episode: { type: 'number', required: true },
    lastUpdate: { type: 'number', required: true },
    link: { type: 'string', required: true }
  },
  { _id: false, id: false }
)
const pageSchema = new Schema<Page>(
  {
    episodes: episodeSchema,
    lastUpdate: { type: 'number', required: true },
    redirectId: { type: 'number', default: null },
    startCount: { type: 'number', required: true, default: 0 },
    lang: { type: 'string', default: 'JP' },
    namePage: { type: 'string', default: '' }
  },
  { _id: false, id: false }
)
const animeSchema = new Schema<Anime>(
  {
    id: { type: 'number', required: true },
    lastUpdate: { type: 'number', required: true },
    episodes: { type: 'number', default: null },
    format: { type: 'string', required: true, default: 'UNKNOWN' },
    status: { type: 'string', default: null },
    description: { type: 'string', default: null },
    averageScore: { type: 'number', default: null },
    duration: { type: 'number', default: null },
    title: {
      romaji: { type: 'string', required: true },
      native: { type: 'string', required: true },
      english: { type: 'string', default: null },
      userPreferred: { type: 'string', default: 'UNKNOWN' }
    },
    coverImage: {
      large: { type: 'string', required: true },
      medium: { type: 'string', required: true },
      color: { type: 'string', default: '#ffffff' }
    },
    titles: { type: ['string'], default: [] },
    pages: { type: Object, of: pageSchema, required: true }
  },
  { _id: false, id: false }
).set('toJSON', {
  transform: (_document, returnObject) => {
    delete returnObject._id
    delete returnObject.__v
  }
})

export const animeModel = model('Anime', animeSchema)
