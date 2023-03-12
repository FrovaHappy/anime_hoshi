import { Router } from 'express'
import { getSubscription, postSubscription } from '../controllers/subscription.controller'
import { buildWebPush } from '../utils/webPush'

const router = Router()

router.get('/', getSubscription)
//TODO: check body
router.post('/', postSubscription)

router.post("/new-message", async (req, res) => {
  const { message, publicKey } = req.body;
  const {webpush, subscription} = await buildWebPush(publicKey)
  // Payload Notification
  const payload = JSON.stringify({
    title: "My Custom Notification",
    message 
  });
  res.status(200).json();
  try {
    await webpush?.sendNotification(subscription, payload);
  } catch (error) {
    console.log(error);
  }
})

export default router