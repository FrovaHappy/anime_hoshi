import { object, z } from 'zod'
import { authorizationHeaders } from '../../validateSchema'
const pages = object({
  namePage: z.string().max(100),
  url: z.string().max(100).url(),
  targetSelectorAll: z.string().max(100),
  episodeSelector: z.string().max(100),
  episodePosition: z.number(),
  titleSelector: z.string().max(100),
  urlEpisodeSelector: z.string().max(100),
  remplaceTitle: z.array(z.array(z.string().max(100)).length(2)),
  remplaceEpisode: z.array(z.array(z.string().max(100)).length(2))
}).strict()

export const createPages = authorizationHeaders.extend({
  body: pages
})
export type CreatePagesBody = z.infer<typeof pages>
