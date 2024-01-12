import { Schema, model } from 'mongoose'
import { type ValidateResult, type ScrapPage, type LangCases } from '../../../../types/ScrapEpisode'
const validateResultSchema = new Schema<ValidateResult>(
  {
    passEpisodePosition: { type: Boolean, required: true },
    passEpisodeSelector: { type: Boolean, required: true },
    passHTML: { type: Boolean, required: true },
    passTargetSelector: { type: Boolean, required: true },
    passTitleSelector: { type: Boolean, required: true },
    passUrlEpisodeSelector: { type: Boolean, required: true },
    timestamp: { type: Number, required: true }
  },
  { _id: false }
)
const LangCasesSchema = new Schema<LangCases>({
  find: String,
  lang: String
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
  langSelector: { type: String, default: 'unknown' },
  defaultLang: { type: String, required: true, default: 'JP' },
  langsCases: { type: [LangCasesSchema], required: true, default: [] },
  remplaceTitle: { type: [[String, String]], required: true, default: [] },
  validatesResults: [validateResultSchema]
})

scrapPagesSchema.set('toJSON', {
  transform: (_document, returnObject) => {
    delete returnObject.__v
  }
})

export const scrapPages = model('ScrapPages', scrapPagesSchema)
