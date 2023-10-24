import mongoose from 'mongoose'
import { type ValidateResult, type ScrapPage } from '../../../../types/ScrapEpisode'
const { Schema, model } = mongoose
const validateResultSchema = new Schema<ValidateResult>({
  passEpisodePosition: { type: Boolean, required: true },
  passEpisodeSelector: { type: Boolean, required: true },
  passHTML: { type: Boolean, required: true },
  passTargetSelector: { type: Boolean, required: true },
  passTitleSelector: { type: Boolean, required: true },
  passUrlEpisodeSelector: { type: Boolean, required: true },
  timestamp: { type: Number, required: true }
})
const scrapPagesSchema = new Schema<ScrapPage>({
  episodePosition: { type: Number, default: 0 },
  episodeSelector: { type: String, required: true },
  namePage: { type: String, required: true },
  targetSelectorAll: { type: String, required: true },
  url: { type: String, required: true },
  urlEpisodeSelector: { type: String, required: true },
  titleSelector: { type: String, required: true },
  remplaceEpisode: { type: [[String, String]], required: true, default: [] },
  remplaceTitle: { type: [[String, String]], required: true, default: [] },
  validatesResults: [validateResultSchema]
})

scrapPagesSchema.set('toJSON', {
  transform: (_document, returnObject) => {
    delete returnObject.__v
  }
})

export const scrapPages = model('ScrapPages', scrapPagesSchema)
