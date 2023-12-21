/**
 * @deprecated Use `ScrapEpisode`
 */
export interface InfoEpisodeRecovered {
  url: string
  title: string
  episode: number
}

export type PagesAttacked = {
  [x: string]: InfoEpisodeRecovered[]
}[]
export interface QueryAnilist {
  data: {
    Media: DataAnilist | null
  } | null
}
export interface TopList {
  animePublished: number[]
}
export type Payload = {
  title: string
  options: {
    icon: string
    body: string
  }
}
export type LogType = 'info' | 'warning' | 'error'
export type LogSection =
  | 'scrapings'
  | 'build episodes'
  | 'push notification'
  | 'routes'
  | 'general'
  | 'query Anilist'
  | 'undefined'
export interface Log {
  type: LogType
  message: string
  content: Object
  section: LogSection
}
export type JsonResponse<T = any> = {
  code: number
  ok: boolean
  message: string
  contents: T
}
