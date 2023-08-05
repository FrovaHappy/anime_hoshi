import { PayloadAnimeNof } from '../types/Payloads'
export type ObjectDynamic<T> = Record<string, T>

export interface notificationProperty {
  hasAccept: boolean
  updated?: number
}
export type UseState<T> = [T, (key: T) => void]
export type InAwait = {
  cantRemitted: number // cant of emitted the notification
  expireIn: number
  anime: PayloadAnimeNof
}
export type NotificationInAwait = Array<InAwait>
export interface NotificationsInAired {
  maxRemitted: number
  delay: number
  expireIn: number
  minPages: number
}
