import type { ObjectId } from 'mongoose'
import type { ScrapPage } from '../../../types/ScrapEpisode'
import { scrapPages } from './models/ScrapPages.model'
interface ScrapPageResponse extends ScrapPage {
  _id: ObjectId
}
async function getAll() {
  return await scrapPages.find({})
}
async function getById(id: ObjectId) {
  return await scrapPages.findById(id)
}
async function getOne(filter: ScrapPageResponse | object) {
  return await scrapPages.findOne(filter)
}
async function replaceOne(filter: ScrapPageResponse | object, data: ScrapPageResponse) {
  return await scrapPages.replaceOne(filter, data, { strict: true })
}
export default {
  getAll,
  getById,
  replaceOne,
  getOne
}
