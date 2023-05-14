export interface Iuser {
  username: string
  passwordHash: string
  roles: string[]
}

export interface IuserWithoutPasswordHash {
  username: string
  password: string
}

export interface TempVapidkey {
  publicKey: string
  privateKey: string
}
export interface Subscription extends TempVapidkey {
  subscription: string
  lastUpdated: number
}

export type PagesScraped = {
  [key: string]: InfoEpisodeRecovered;
}[]

export type TokenBody = {
  username: string
  id: string
  roles: string[]
}
export type DataAttck = {
  urlPage: string
  selectorEpisodes: string
  selectorUrl: string
  selectorEpisode: string
  positionEpisodeInString: number
  selectorTitle: string
  namePages: PagesNames
  testMode: boolean
}
export type RoleUser = 'owner' | 'admin' | 'user'
export type PagesNames = 'animeFlv' | 'monosChinos' | 'animeblix' | 'jkanime'
