import {PayloadAnimeNof} from "../types/Payloads"
export type ObjectDynamic<T> = Record<string, T>

export interface notificationProperty {
  hasAccept: boolean
  updated?: number
}
export type UseState<T> = [T, (key: T) => void]
export type InAwait = [
    timestamps: number, // time of emitted the notification
    remitted: number, // time of emitted the notification
    anime: PayloadAnimeNof
  ]
export interface NotificationsInAired {
  maxRemitted: number
  delay: number
  sendWhereFind: number // default 0 for all notifications
  inAwaits: Array<InAwait>
}