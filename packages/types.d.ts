export interface InfoEpisodeRecovered {
  url: string
  title: string
  episode: number
}
export interface DataAnilist {
  id: number
  episodes: number | null
  status: string
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
    Media: DataAnilist
  } | null
}
export interface TopList {
  animePublished: number[]
}
export interface EpisodesContent {
  updateEpisode: number
  pagesUrl: KeyDinamicString
}
export interface Episodes {
  [key: string]: EpisodesContent | undefined
}
interface KeyDinamicString {
  [key: string]: string | undefined
}
export interface AnimeList {
  updateAnilist: number
  dataAnilist: DataAnilist
  episodes: Episodes
  titleinPages: KeyDinamicString
}