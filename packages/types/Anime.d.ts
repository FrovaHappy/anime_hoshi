import { DataAnilist } from './dataAnilist'

type DynamicObj<T> = { [key: string]: T }

export type Episode = {
  link: string
  episode: number
  lastUpdate: number
}

export type Episodes = DynamicObj<Episode>

export type Page = {
  startCount: number
  title: string
  lastUpdate: number
  redirectId: number | null

  episodes: Episodes
}

export type Pages = DynamicObj<Page>

export type Anime = {
  dataAnilist: DataAnilist
  pages: Pages
}
