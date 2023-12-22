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
const pageScchema = new Schema<Page>(
  {
    episodes: episodeSchema,
    lastUpdate: { type: 'number', required: true },
    redirectId: { type: 'number', default: null },
    startCount: { type: 'number', required: true, default: 0 },
    title: { type: 'string', required: true }
  },
  { _id: false, id: false }
)
const animeSchema = new Schema<Anime>(
  {
    dataAnilist: {
      id: { type: 'number', required: true },
      lastUpdate: { type: 'number', required: true },
      episodes: { type: 'number', default: null },
      format: { type: 'string', required: true },
      status: { type: 'string', default: null },
      description: { type: 'string', default: null },
      averageScore: { type: 'number', default: null },
      duration: { type: 'number', default: null },
      title: {
        romaji: { type: 'string', required: true },
        native: { type: 'string', required: true },
        english: { type: 'string', default: null },
        userPreferred: { type: 'string', required: true }
      },
      coverImage: {
        large: { type: 'string', required: true },
        medium: { type: 'string', required: true },
        color: { type: 'string', default: '#ffffff' }
      }
    },
    pages: { type: Object, of: pageScchema, required: true },
    lastUpdate: { type: 'number', required: true }
  },
  { _id: false, id: false }
).set('toJSON', {
  transform: (_document, returnObject) => {
    delete returnObject._id
    delete returnObject.__v
  }
})

export const animeModel = model('Anime', animeSchema)
