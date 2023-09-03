import type React from 'react'
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

export function isValidInput(e: React.ChangeEvent<HTMLInputElement>, regex: RegExp | null = null) {
  const validRegex = regex?.test(e.target.value) ?? true
  if (!validRegex) e.target.setCustomValidity('No se cumplen todas las condiciones.')
  else e.target.setCustomValidity('')

  if (!e.target.validity.valid || !validRegex) {
    e.target.classList.add('invalid')
    e.target.reportValidity()
  } else {
    e.target.classList.remove('invalid')
  }
}
