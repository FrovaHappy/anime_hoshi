import mongoose from 'mongoose'
const { Schema, model } = mongoose

const animesPublishedSchema = new Schema(
  {
    animePublished: [Number]
  },
  { _id: false }
)

const animesPublishedModel = model('animesPublished', animesPublishedSchema)

export async function findAll () {
  return (await animesPublishedModel.find())[0]?.animePublished ?? []
}

export async function updateAll (animesPublished: number[]) {
  return await animesPublishedModel.updateOne(
    undefined,
    { animePublished: animesPublished },
    { strict: true, upsert: true }
  )
}

export default {
  findAll,
  updateAll
}
