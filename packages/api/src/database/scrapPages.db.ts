import type { Types } from 'mongoose'
import type { ScrapPage } from '../../../types/ScrapEpisode'
import { scrapPages } from './models/ScrapPages.model'
export interface ScrapPageResponse extends ScrapPage {
  _id: Types.ObjectId
}
async function getAll() {
  return await scrapPages.find({})
}
async function getById(id: Types.ObjectId) {
  return await scrapPages.findById(id)
}
async function getOne(filter: ScrapPageResponse | object) {
  return await scrapPages.findOne(filter)
}
async function replaceOne(filter: ScrapPageResponse | object, data: ScrapPageResponse | object) {
  return await scrapPages.replaceOne(filter, data, { strict: true })
}
async function create(data: ScrapPageResponse | object) {
  return await scrapPages.create(data)
}
export default {
  getAll,
  getById,
  replaceOne,
  getOne,
  create
}
