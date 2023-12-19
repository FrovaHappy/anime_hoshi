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
export type RoleUser = 'owner' | 'admin' | 'user' | 'viewer'
export type CacheKeys = 'animes' | 'animesPublished' | 'animesUpdated' | 'tempVapidKeys'
