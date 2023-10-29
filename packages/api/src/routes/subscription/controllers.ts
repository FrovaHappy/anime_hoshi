import type { Request, Response } from 'express'
import type { JsonResponse } from '../../../../types'
import pushNotifications from '../../modules/pushNotifications'
import { saveSubscription } from './services'

export function getSubscription(_req: Request, res: Response<JsonResponse>) {
  const publicKey = pushNotifications.vapidKey.create()
  return res.status(200).json({ code: 200, ok: true, contents: { publicKey }, message: 'vapidKey Created' })
}

export async function postSubscription(req: Request, res: Response) {
  const { pushSubscription, publicKey } = req.body
  const result = await saveSubscription(JSON.stringify(pushSubscription), publicKey)
  if (result == null) {
    return res.status(400).json({
      message: 'use at least once GET /subscriptions to generate the publicKey correctly.',
      code: 400,
      contents: null,
      ok: false
    })
  }
  return res.status(200).json({ message: 'push subscriptions saved', ok: false, code: 200, contents: null })
}
