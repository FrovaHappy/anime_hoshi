import { z } from 'zod'
import { authorizationHeaders } from '../validateSchema'

const password = z
  .string()
  .min(8)
  .max(512)
  .regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g,
    'La contraseña debe contener al menos un numero, letra minúsculas, letra mayúsculas y/o especiales'
  )
const user = z
  .object({
    username: z
      .string()
      .min(3)
      .max(30)
      .regex(/^[a-zA-Z0-9.\-_]{3,30}$/g, 'solo debe contener a-z A-Z 0-9 .(punto) _ (guion bajo) y - (guion)'),
    password
  })
  .strict()

const passwordUpdate = z
  .object({
    oldPassword: password,
    newPassword: password
  })
  .strict()

export const userValidate = z.object({
  body: user
})
export const passwordUpdateValidate = authorizationHeaders.extend({
  body: passwordUpdate
})

export type UserValidate = z.infer<typeof user>
export type PasswordValidate = z.infer<typeof passwordUpdate>
