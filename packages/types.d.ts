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
export interface Log {
  type: LogType
  message: string
  content: Object
}
export type JsonResponse<T = any> = {
  code: number
  message: string
  contents: T
}