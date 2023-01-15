import mongoose from 'mongoose'
const { Schema, model } = mongoose

const animesPublishedSchema = new Schema(
  {
    animePublished: [Number],
  },
  { _id: false }
)

const animesPublishedModel = model('animesPublished', animesPublishedSchema)

export async function findAnimePublished() {
  return await animesPublishedModel.find()
}

export async function updatedAnimesPublished(animesPublished: number[]) {
  const config = { upsert: true, returnDocument: 'after' }
  return await animesPublishedModel.updateOne(undefined, { animePublished: animesPublished }, config)
}
