import { z } from 'zod'
import { authorizationHeaders } from '../validateSchema'

const updateEpisodeErrorBody = z
  .object({
    timestamp: z.number().min(12).positive().optional(),
    url: z.string().url(),
    isOpen: z.boolean()
  })
  .strict()
export const updateEpisodeError = authorizationHeaders.extend({
  body: updateEpisodeErrorBody
})

export type UpdateEpisodeErrorBody = z.infer<typeof updateEpisodeErrorBody>

const deleteEpisodeErrorBody = z
  .object({
    url: z.string().url()
  })
  .strict()

export const deleteEpisodeError = authorizationHeaders.extend({
  body: deleteEpisodeErrorBody
})

export type DeleteEpisodeErrorBody = z.infer<typeof deleteEpisodeErrorBody>
