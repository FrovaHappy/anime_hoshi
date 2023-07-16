import { optional, z } from 'zod'

const episodes = z
  .object({
    url: optional(z.string().url()),
    oldEpisode: z.number().max(10_000).nonnegative(),
    newEpisode: optional(z.number().max(10_000).nonnegative()),
    lastUpdated: optional(z.boolean()),
  })
  .strict()
const updateAnimeBody = z
  .object({
    id: z.number().nonnegative().min(1).max(100_000),
    namePage: z.string().nonempty().min(2).trim(),
    startCount: optional(z.number().nonnegative()),
    title: optional(z.string().nonempty().min(1).trim()),
    redirectId: optional(z.number().nonnegative().min(1).max(100_000)),
    lastUpdated: optional(z.boolean()),
    episodes: optional(z.array(episodes)),
  })
  .strict()

export const updateAnime = z.object({
  body: updateAnimeBody,
})
export type UpdateAnimeBodyType = z.infer<typeof updateAnimeBody>
