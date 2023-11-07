import type React from 'react'
import type { ScrapPage } from '../../../../../types/ScrapEpisode'
export function parseDupla(string: string): Array<[string, string]> | null {
  try {
    const array = JSON.parse(string)
    array.forEach((item: any) => {
      if (item?.length !== 2) throw new Error()
      if (typeof item[0] !== 'string') throw new Error()
      if (typeof item[1] !== 'string') throw new Error()
    })
    return array
  } catch {
    return null
  }
}
export default function handleUpdateSubmit(page: ScrapPage & Record<string, any>, setData: (k: any) => void) {
  return (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = Object.fromEntries(new FormData(e.target as HTMLFormElement)) as Record<string, any>

    form.episodePosition = parseInt(form.episodePosition)
    const remplaceTitle = parseDupla(form.remplaceTitle)
    const remplaceEpisode = parseDupla(form.remplaceEpisode)
    if (!remplaceTitle || !remplaceEpisode) return

    const formParsed = Object.fromEntries(
      Object.entries(form).filter(([key, val]) => val && page[key] !== val)
    ) as Partial<ScrapPage>

    formParsed.namePage = page.namePage
    formParsed.remplaceTitle = remplaceTitle
    formParsed.remplaceEpisode = remplaceEpisode

    setData(formParsed)
  }
}
