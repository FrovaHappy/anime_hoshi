self.addEventListener('push', (e) => {
  /** @type {(import('../../types/Payloads').PayloadAnimeNof)[]} */
  const data = e.data.json()
  data.map((push) => {
    const title = `${push.title} emitido`
    const formatter = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' })
    const body = `
      Episodio ${push.episode} encontrado
      En: ${formatter.format(push.namePages)}
    `
    self.registration.showNotification(title, {
      body: body,
      icon: push.image,
    })
  })
})
