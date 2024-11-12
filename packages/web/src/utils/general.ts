import type React from 'react'
import { type Anime } from '../../../types/Anime'
export function toPascalCase(s: string) {
  return s.replace(/\w+/g, function (w) {
    return w[0].toUpperCase() + w.slice(1).toLowerCase()
  })
}
export function stringToObject<T>(s: string | undefined): T | null {
  try {
    const object = JSON.parse(s!)
    return object
  } catch {
    return null
  }
}

export function isValidInput(
  e: React.ChangeEvent<HTMLInputElement>,
  regex: RegExp | null = null,
  message: string = 'No se cumplen todas las condiciones.'
) {
  const validRegex = regex?.test(e.target.value) ?? true
  if (!validRegex) e.target.setCustomValidity(message)
  else e.target.setCustomValidity('')

  if (!e.target.validity.valid || !validRegex) {
    e.target.classList.add('invalid')
    e.target.reportValidity()
  } else {
    e.target.classList.remove('invalid')
  }
}
export function mayorLastUpdate(a: Anime) {
  let lastUpdate = 0
  const namePages = Object.keys(a.pages)
  namePages.forEach(namePage => {
    const page = a.pages[namePage]
    if (lastUpdate < page.lastUpdate) lastUpdate = page.lastUpdate
  })
  return lastUpdate
}
