import { optional, z } from 'zod'
import { authorizationHeaders } from '../validateSchema'
const id = z.number().nonnegative().min(1).max(1_000_000)
const episodes = z
  .object({
    link: z.string().url(),
    oldEpisode: z.number().max(10_000).nonnegative(),
    newEpisode: optional(z.number().max(10_000).nonnegative()),
    lastUpdate: optional(z.boolean())
  })
  .strict()
const updateAnimeBody = z
  .object({
    id,
    namePage: z.string().min(2).trim(),
    title: z.string().min(1).trim(),
    startCount: optional(z.number().nonnegative()),
    redirectId: optional(id),
    lastUpdate: optional(z.boolean()),
    episodes: optional(z.array(episodes))
  })
  .strict()

export const updateAnime = authorizationHeaders.extend({
  body: updateAnimeBody
})
export type UpdateAnimeBodyType = z.infer<typeof updateAnimeBody>

const deleteAnimeBody = z
  .object({
    id
  })
  .strict()

export const deleteAnime = authorizationHeaders.extend({
  body: deleteAnimeBody
})

export type DeleteAnime = z.infer<typeof deleteAnimeBody>
