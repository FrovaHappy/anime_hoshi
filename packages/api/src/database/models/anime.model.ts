import mongoose from 'mongoose'
import { AnimeEdited } from '../../module-scrapping/types'
const { Schema, model } = mongoose

const animeSchema = new Schema<AnimeEdited>(
  {
    data: {
      id: { type: 'number', required: true },
      episodes: { type: 'number', required: true },
      format: { type: 'string', required: true },
      status: { type: 'string', required: true },
      title: {
        english: { type: 'string', required: true },
        romaji: { type: 'string', required: true },
        native: { type: 'string', required: true },
      },
      coverImage: {
        large: { type: 'string', required: true },
        medium: { type: 'string', required: true },
        color: { type: 'string', required: true },
      },
      nextAiringEpisode: {
        airingAt: { type: 'number', required: true },
        episode: { type: 'number', required: true },
      },
    },
    pages: [
      {
        nameOfPage: { type: 'string', required: true },
        title: { type: 'string', required: true },
        episodes: [
          {
            url: { type: 'string', required: true },
            episode: { type: 'number', required: true },
          },
        ],
      },
    ],
  },
  { _id: false }
).set('toJSON', {
  transform: (_document, returnObject) => {
    delete returnObject._id
    delete returnObject.__v
  },
})

export const animeModel = model('Anime', animeSchema)
