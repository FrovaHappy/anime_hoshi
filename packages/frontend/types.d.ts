import { type PayloadAnimeNof } from '../types/Payloads'
export type ObjectDynamic<T> = Record<string, T>

export interface notificationProperty {
  hasAccept: boolean
  updated?: number
}
export type UseState<T> = [T, (key: T) => void]
export interface InAwait {
  cantRemitted: number // cant of emitted the notification
  expireIn: number
  created: number
  anime: PayloadAnimeNof
  pastLengthPages: number
}
export type NotificationInAwait = InAwait[]
export interface NotificationsInAired {
  maxRemitted: number
  delay: number
  expireIn: number
  minPages: number
}
export interface User {
  newToken: string
  username: string
  roles: string[]
}

export interface EnabledSettings {
  expiredDelay: boolean
  expiredNotification: boolean
  remittedRange: boolean
  satisfiesMinPages: boolean
}
