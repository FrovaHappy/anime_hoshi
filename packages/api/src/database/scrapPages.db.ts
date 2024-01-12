import type { Types } from 'mongoose'
import type { ScrapPage } from '../../../types/ScrapEpisode'
import { scrapPages } from './models/ScrapPages.model'
export interface ScrapPageResponse extends ScrapPage {
  _id: Types.ObjectId
}
export function vitalityQuery(query: ScrapPageResponse) {
  return {
    ...query,
    langSelector: query.langSelector ?? 'unknown',
    langsCases: query.langsCases ?? [],
    defaultLang: query.defaultLang ?? 'JP'
  } satisfies ScrapPageResponse
}
async function getAll() {
  const query = await scrapPages.find({})
  return query.map(q => vitalityQuery(q.toJSON()))
}
async function getById(id: Types.ObjectId) {
  const query = await scrapPages.findById(id)
  if (!query) return null

  return vitalityQuery(query.toJSON())
}
async function getOne(filter: ScrapPageResponse | object) {
  const query = await scrapPages.findOne(filter)
  if (!query) return null
  return vitalityQuery(query.toJSON())
}
async function replaceOne(filter: ScrapPageResponse | object, data: Partial<ScrapPageResponse> | object) {
  return await scrapPages.replaceOne(filter, data, { strict: true })
}
async function updateOne(filter: ScrapPageResponse | object, data: Partial<ScrapPageResponse> | object) {
  return await scrapPages.updateOne(filter, data, { strict: true })
}
async function create(data: ScrapPageResponse | object) {
  return await scrapPages.create(data)
}
export default {
  getAll,
  getById,
  replaceOne,
  updateOne,
  getOne,
  create
}
