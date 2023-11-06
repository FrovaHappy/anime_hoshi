import { object, z } from 'zod'
import { authorizationHeaders } from '../../validateSchema'
const pages = object({
  namePage: z.string().min(3).max(100),
  url: z.string().min(14).max(100).url(),
  targetSelectorAll: z.string().min(1).max(100),
  episodeSelector: z.string().min(1).max(100),
  episodePosition: z.number().min(-100).max(100),
  titleSelector: z.string().min(1).max(100),
  urlEpisodeSelector: z.string().min(1).max(100),
  remplaceTitle: z.array(z.array(z.string().min(1).max(100)).length(2)),
  remplaceEpisode: z.array(z.array(z.string().min(1).max(100)).length(2))
}).strict()

export const createPages = authorizationHeaders.extend({
  body: pages
})
export type CreatePagesBody = z.infer<typeof pages>
