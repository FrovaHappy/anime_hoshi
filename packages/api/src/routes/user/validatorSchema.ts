import { z } from 'zod'

const user = z
  .object({
    username: z
      .string()
      .min(3)
      .max(30)
      .regex(/^[a-zA-Z0-9.\-_]{3,30}$/g, 'solo debe contener a-z A-Z 0-9 .(punto) _ (guion bajo) y - (guion)'),
    password: z.string().min(8).max(256)
  })
  .strict()

const passwordUpdate = z
  .object({
    oldPassword: z.string().min(8).max(256),
    newPassword: z.string().min(8).max(256)
  })
  .strict()

export const userValidate = z.object({
  body: user
})
export const passwordUpdateValidate = z.object({
  headers: z.object({
    authorization: z.string()
  }),
  body: passwordUpdate
})
export type UserValidate = z.infer<typeof user>
export type PasswordValidate = z.infer<typeof passwordUpdate>
