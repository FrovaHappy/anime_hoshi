import { KeysLocalStorage } from '../enum'
import type React from 'react'

export function toggleTheme(e: React.MouseEvent<HTMLInputElement>) {
  const theme = e.currentTarget.checked ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  window.localStorage.setItem(KeysLocalStorage.theme, theme)
}
export function getTheme() {
  const themePrefers = window.matchMedia('[prefers-color-scheme: dark]') ? 'dark' : 'light'
  const theme = window.localStorage.getItem(KeysLocalStorage.theme) ?? themePrefers
  document.documentElement.setAttribute('data-theme', theme)
}
