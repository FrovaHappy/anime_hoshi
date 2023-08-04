import { KeysLocalStorage } from '../enum'

export function toPascalCase(s: string) {
  return s.replace(/\w+/g, function (w) {
    return w[0].toUpperCase() + w.slice(1).toLowerCase()
  })
}
export function getObjectOfLocaleStorage<T>(key: KeysLocalStorage): T | null {
  const string = localStorage.getItem(key)
  if (!string) return null
  return JSON.parse(string)
}
