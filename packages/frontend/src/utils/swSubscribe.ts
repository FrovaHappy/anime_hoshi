import { urlApi } from '../config'
async function getPublicKey() {
  const publicKey = localStorage.getItem('publicKey')
  const data = !publicKey
    ? await fetch(`${urlApi}/subscription`)
        .then((response) => response.json())
        .then((response) => response.publicKey)
    : publicKey
  localStorage.setItem('publicKey', data)
  return data
}

const subscription = async () => {
  const PUBLIC_VAPID_KEY = await getPublicKey()

  // Service Worker
  const register = await navigator.serviceWorker.register('./worker.js', {
    scope: '/',
  })

  // Listen Push Notifications
  const getPushSubscription = await register.pushManager.getSubscription()
  if (getPushSubscription) {
    await getPushSubscription.unsubscribe()
  }
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
  })

  // Send Notification
  await fetch(`${urlApi}/subscription`, {
    method: 'POST',
    body: JSON.stringify({ pushSubscription: subscription, publicKey: PUBLIC_VAPID_KEY }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((response) => console.log(response))
  //TODO: show the subcription was correct
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

// Service Worker Support
async function notifyMe() {
  // Comprobamos si el navegador soporta las notificaciones
  if (!('Notification' in window)) {
    console.error('Este navegador no es compatible con las notificaciones de escritorio')
  } else if (Notification.permission === 'granted') {
    if ('serviceWorker' in navigator) {
      subscription().catch((err) => {
        console.error(err)
      })
    }
  }

  // Si no, pedimos permiso para la notificación
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // Si el usuario nos lo concede, creamos la notificación
      if (permission === 'granted') {
        if ('serviceWorker' in navigator) {
          subscription().catch((err) => {
            console.error(err)
          })
        }
      }
    })
  }
}

export async function unsubscribe() {
  const register = await navigator.serviceWorker.register('./worker.js', {
    scope: '/',
  })
  const getPushSubscription = await register.pushManager.getSubscription()
  if (getPushSubscription) {
    await getPushSubscription.unsubscribe()
  }
}
export default notifyMe
