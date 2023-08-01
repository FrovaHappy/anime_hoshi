import { Request, Response } from 'express'
import pushNotifications from '../../modules/pushNotifications'
import { JsonResponse } from '../../../../types'
import { saveSubscription } from './services'

export function getSubscription(_req: Request, res: Response) {
  const publicKey = pushNotifications.vapidKey.create()
  return res.status(200).json({ code: 200, contents: { publicKey }, message: 'vapidKey Created' } as JsonResponse)
}

export async function postSubscription(req: Request, res: Response) {
  const { pushSubscription, publicKey } = req.body
  const result = await saveSubscription(JSON.stringify(pushSubscription), publicKey)
  return result
    ? res.status(200).json({ message: 'push subscriptions saved', code: 200, contents: null } as JsonResponse)
    : res.status(400).json({
        message: 'use at least once GET /subscriptions to generate the publicKey correctly.',
        code: 400,
        contents: null,
      } as JsonResponse)
}
