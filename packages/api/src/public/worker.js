console.log('Service Worker Works')

self.addEventListener('push', (e) => {
  const data = e.data.json()
  console.log(data)
  console.log('Notification Received')
  data.map((push) => {
    self.registration.showNotification(push.title, {
      body: push.options.body,
      icon: push.options.icon,
    })
  })
})
