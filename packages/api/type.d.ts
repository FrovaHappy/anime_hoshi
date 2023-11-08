export interface Iuser {
  username: string
  passwordHash: string
  roles: string[]
}

export interface IuserWithoutPasswordHash {
  username: string
  password: string
}

export interface Vapidkey {
  publicKey: string
  privateKey: string
}
export interface Subscription extends Vapidkey {
  subscription: string
  lastUpdated: number
}

export type PagesScraped = Array<Record<string, InfoEpisodeRecovered>>

export interface TokenBody {
  username: string
  id: string
  roles: string[]
}
export interface DataAttck {
  urlPage: string
  selectorEpisodes: string
  selectorUrl: string
  selectorEpisode: string
  positionEpisodeInString: number
  selectorTitle: string
  namePages: PagesNames
  testMode: boolean
  remplaceTitle?: Array<[searchValue: string | RegExp, remplaceValue: string]>
  remplaceEpisode?: Array<[searchValue: string | RegExp, remplaceValue: string]>
}
export type RoleUser = 'owner' | 'admin' | 'user' | 'viewer'
export type PagesNames = 'animeFlv' | 'monosChinos' | 'animeblix' | 'jkanime' | 'crunchyroll'
export type CacheKeys = 'animes' | 'animesPublished' | 'animesUpdated' | 'tempVapidKeys'
