export interface InfoEpisodeRecovered {
  url: string
  title: string
  episode: number
}
type Status = 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED' | 'CANCELLED' | 'HIATUS'
type Format = 'MUSIC' | 'ONA' | 'OVA' | 'SPECIAL' | 'MOVIE' | 'TV_SHORT' | 'TV'
export interface DataAnilist {
  id: number
  episodes: number | null
  status?: Status
  format?: Format
  description?: string
  averageScore?: number
  coverImage: CoverImage
  title: Title
}
export interface CoverImage {
  large: string
  medium: string
  color: string
}
export interface Title {
  romaji: string
  english: string
  native: string
  userPreferred: string
}
export interface QueryAnilist {
  data: {
    Media: DataAnilist | null
  } | null
}
export interface TopList {
  animePublished: number[]
}
export interface EpisodesContent {
  updateEpisode: number
  pagesUrl: KeyDinamicString | PagesUrlObject
}
export interface Episodes {
  [key: string]: EpisodesContent | undefined
}
interface KeyDinamicString {
  [key: string]: string | undefined
}
export interface PagesUrlObject {
  [key: string]: {
    url: string
    update: number
  }
}
export interface AnimeList {
  updateAnilist: number
  dataAnilist: DataAnilist
  episodes: Episodes
  titleinPages: KeyDinamicString
  lastEpisodesOfTempPreview?: number
}
export type Payload = {
  title: string
  options: {
    icon: string
    body: string
  }
}