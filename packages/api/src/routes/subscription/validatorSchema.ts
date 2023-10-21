import { z } from 'zod'

const subscription = z
  .object({
    pushSubscription: z
      .object({
        endpoint: z.string().url(),
        expirationTime: z.number().nullable(),
        keys: z
          .object({
            auth: z.string().min(1),
            p256dh: z.string().min(1)
          })
          .strict()
      })
      .strict(),
    publicKey: z.string().min(1)
  })
  .strict()

export const subscriptionValidate = z.object({
  body: subscription
})

export type Subscription = z.infer<typeof subscription>
