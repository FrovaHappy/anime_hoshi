import mongoose from 'mongoose'
import { type EpisodeError } from '../../../../types/ScrapEpisode'
const { Schema, model } = mongoose

const errorEpisodeSchema = new Schema<EpisodeError>({
  episode: { type: 'Number', required: true },
  errorCapture: { type: 'String', required: true },
  isOpen: { type: 'Boolean', required: true },
  timestamp: { type: 'Number', required: true },
  namePage: { type: 'String', required: true },
  title: { type: 'String', required: true },
  link: { type: 'String', required: true, unique: true }
})

export const errorEpisodeModel = model('error_episode', errorEpisodeSchema)
