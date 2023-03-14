async function getPublicKey() {
  const publicKey = localStorage.getItem('publicKey')
  const data = !publicKey
    ? await fetch('http://127.0.0.1:3001/subscription')
        .then((response) => response.json())
        .then((response) => response.publicKey)
    : publicKey
  localStorage.setItem('publicKey', data)
  return data
}

const subscription = async () => {
  const PUBLIC_VAPID_KEY = await getPublicKey()
  console.log('🚀 ~ file: main.js:10 ~ subscription ~ PUBLIC_VAPID_KEY:', PUBLIC_VAPID_KEY)

  // Service Worker
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/',
  })
  console.log('New Service Worker')

  // Listen Push Notifications
  console.log('Listening Push Notifications')
  const getPushSubscription = await register.pushManager.getSubscription()
  if (getPushSubscription) {
    await getPushSubscription.unsubscribe().finally(() => console.log('Push subscription deleted'))
  }
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
  })

  // Send Notification
  const id = await fetch('http://127.0.0.1:3001/subscription', {
    method: 'POST',
    body: JSON.stringify({ pushSubscription: subscription, publicKey: PUBLIC_VAPID_KEY }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json()).then(response=> console.log(response))
  console.log('Subscribed!')
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

// UI
const form = document.querySelector('#myform')
const message = document.querySelector('#message')
form.addEventListener('submit', (e) => {
  const publicKey = localStorage.getItem('publicKey')
  e.preventDefault()
  fetch('http://127.0.0.1:3001/subscription/new-message', {
    method: 'POST',
    body: JSON.stringify({ message: message.value, publicKey: publicKey }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  form.reset()
})

// Service Worker Support
function notifyMe() {
  // Comprobamos si el navegador soporta las notificaciones
  if (!("Notification" in window)) {
    console.log("Este navegador no es compatible con las notificaciones de escritorio");
  }

  // Comprobamos si los permisos han sido concedidos anteriormente
  else if (Notification.permission === "granted") {
    // Si es correcto, lanzamos una notificación
    if ('serviceWorker' in navigator) {
      subscription().catch((err) => {
        console.log(err)
      })
    }
  }

  // Si no, pedimos permiso para la notificación
  else if (Notification.permission !== 'denied' || Notification.permission === "default") {
    Notification.requestPermission(function (permission) {
      // Si el usuario nos lo concede, creamos la notificación
      if (permission === "granted") {
        if ('serviceWorker' in navigator) {
          subscription().catch((err) => {
            console.log(err)
          })
        }
      }
    });
  }
}
notifyMe()
