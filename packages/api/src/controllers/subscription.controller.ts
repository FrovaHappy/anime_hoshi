import { Request, Response } from 'express'
import { createVapidKey, saveSubscription } from '../services/subscription.services'

export function getSubscription(_req: Request, res: Response) {
  const publicKey = createVapidKey()
  res.status(200).json({ publicKey })
}

export async function postSubscription(req: Request, res: Response) {
  const { pushSubscription, publicKey } = req.body

  console.log(req.body)
  const { error, message, statuscode } = await saveSubscription(JSON.stringify(pushSubscription), publicKey)
  error ? res.status(statuscode).json({ message }) : res.status(statuscode).json({ message})
}
