export function toPascalCase(s: string) {
  return s.replace(/\w+/g, function (w) {
    return w[0].toUpperCase() + w.slice(1).toLowerCase()
  })
}
export function stringToObject<T>(s: string | undefined): T | null {
  try {
    const object = JSON.parse(s as string)
    return object
  } catch {
    return null
  }
}
