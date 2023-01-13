(async () => {
  try {
    await import('./mongoose')
    await import('./app')
  } catch (e) {
    console.error(e)
  }
})()
