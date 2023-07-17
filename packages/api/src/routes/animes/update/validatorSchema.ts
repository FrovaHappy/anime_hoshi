import { optional, z } from 'zod'

const episodes = z
  .object({
    link: z.string().url(),
    oldEpisode: z.number().max(10_000).nonnegative(),
    newEpisode: optional(z.number().max(10_000).nonnegative()),
    lastUpdate: optional(z.boolean()),
  })
  .strict()
const updateAnimeBody = z
  .object({
    id: z.number().nonnegative().min(1).max(100_000),
    namePage: z.string().nonempty().min(2).trim(),
    title: z.string().nonempty().min(1).trim(),
    startCount: optional(z.number().nonnegative()),
    redirectId: optional(z.number().nonnegative().min(1).max(100_000)),
    lastUpdate: optional(z.boolean()),
    episodes: optional(z.array(episodes)),
  })
  .strict()

export const updateAnime = z.object({
  body: updateAnimeBody,
})
export type UpdateAnimeBodyType = z.infer<typeof updateAnimeBody>