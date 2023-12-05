import { urlApi } from '../config'
import { KeysLocalStorage } from '../enum'
const PATCH_SW = '/sw.js'

export interface Messages {
  isError: boolean
  message: string
}
const MESSAGES: Record<string, Messages> = {
  errorInApi: { isError: true, message: 'A ocurrido un error mientras conectábamos con el servidor.' },
  denied: { isError: true, message: 'Requieres permisos para recibir notificaciones.' },
  undefined: { isError: true, message: 'Error no controlado, por favor reporta este bug.' },
  errorInPublicKey: { isError: true, message: 'Error al obtener la publicKey, inténtelo nuevamente.' },
  errorInRegister: { isError: true, message: 'Error Registrando el service Workers.' },
  success: { isError: false, message: 'Suscripción a las notificaciones realizadas correctamente.' }
}

async function getPublicKey() {
  const publicKey = localStorage.getItem(KeysLocalStorage.publicKey)
  localStorage.removeItem(KeysLocalStorage.publicKey)

  const fetching = async (): Promise<string | null> =>
    await fetch(`${urlApi}/subscription`)
      .then(async response => await response.json())
      .then(response => response.contents.publicKey)
      .catch(() => null)

  const data = publicKey ?? (await fetching())

  if (!data) return null
  localStorage.setItem(KeysLocalStorage.publicKey, data)
  return data
}

async function subscription(): Promise<Messages> {
  const PUBLIC_VAPID_KEY = await getPublicKey()
  if (!PUBLIC_VAPID_KEY) return MESSAGES.errorInPublicKey
  const getRegister = await navigator.serviceWorker.getRegistration(PATCH_SW)
  if (getRegister) await getRegister.unregister()
  const register = await navigator.serviceWorker
    .register(PATCH_SW, {
      scope: '/',
      type: 'module'
    })
    .catch(err => {
      console.log(err)
      return null
    })
  if (!register) return MESSAGES.errorInRegister
  await register.update().catch(err => {
    console.log(err)
  })

  const subscription = await register.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    })
    .catch(err => {
      console.log(err)
    })
  // Send Notification
  const postSubscriptions = await fetch(`${urlApi}/subscription`, {
    method: 'POST',
    body: JSON.stringify({
      pushSubscription: subscription,
      publicKey: PUBLIC_VAPID_KEY
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(async response => await response.json())
  if (postSubscriptions.code === 200) return MESSAGES.success
  localStorage.removeItem(KeysLocalStorage.publicKey)
  return MESSAGES.errorInApi
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export async function canSandNotification(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.error('Este navegador no es compatible con las notificaciones de escritorio')
    return false
  }
  let permission = Notification.permission
  if (permission === 'default') {
    permission = await Notification.requestPermission()
  }
  return permission === 'granted'
}

export async function subscribe(): Promise<Messages> {
  const canSend = await canSandNotification()
  if (!canSend) return MESSAGES.denied
  return await subscription().catch(err => {
    console.error(err)
    return MESSAGES.undefined
  })
}

export async function unsubscribe() {
  const canSend = await canSandNotification()
  if (!canSend) return false

  const register = await navigator.serviceWorker.getRegistration(PATCH_SW)
  if (register) {
    return await register.unregister()
  }
  return false
}
