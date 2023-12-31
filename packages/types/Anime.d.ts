import { DataAnilist } from './dataAnilist'

type DynamicObj<T> = { [key: string]: T }

export type Episode = {
  link: string
  episode: number
  lastUpdate: number
}

export type Episodes = Array<Episode>

export type Page = {
  startCount: number
  namePage: string
  lang: string
  lastUpdate: number
  redirectId: number | null
  episodes: Episodes
}

export type Pages = DynamicObj<Page>

export interface Anime extends DataAnilist {
  titles: string[]

  pages: Pages
  lastUpdate: number
}
export type AnimeMinified = {
  lastUpdate: number
  title: string
  image: string
  color: string
  episode: number
  id: number
}
