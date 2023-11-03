import { object, string } from 'zod'

export const authorizationHeaders = object({
  headers: object({
    authorization: string()
  })
})
