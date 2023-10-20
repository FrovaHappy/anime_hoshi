import webpush from 'web-push'
import cache from '../../utils/cache'
import { type Vapidkey } from '../../../type'
/**
 * @return returns the `publicKey` created
 */
function create () {
  const vapidkey = webpush.generateVAPIDKeys()
  const tempVapidkeys: Vapidkey[] = cache.get('tempVapidKeys') || []
  tempVapidkeys.push(vapidkey)
  cache.set('tempVapidKeys', tempVapidkeys)
  return vapidkey.publicKey
}
async function search (publicKey: string) {
  const tempVapidkeys: Vapidkey[] = cache.get('tempVapidKeys') || []
  const indexVapidkey = tempVapidkeys.findIndex(v => v.publicKey === publicKey)
  if (indexVapidkey === -1) return null
  const vapidkey = tempVapidkeys[indexVapidkey]
  return {
    ...vapidkey,
    index: indexVapidkey
  }
}

async function deleted (index: number) {
  const tempVapidkeys: Vapidkey[] = cache.get('tempVapidKeys') || []
  const vapidKeys = tempVapidkeys.splice(index, 1) // remove
  cache.set('tempVapidKeys', vapidKeys)
}
export default { search, deleted, create }
