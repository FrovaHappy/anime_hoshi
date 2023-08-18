import { type NotificationsInAired } from '../../types'
import { Timestamps } from '../enum'

export const DEFAULT_TOTAL_PAGES = 5
export const DEFAULT_NOTIFICATIONS: NotificationsInAired = {
  delay: Timestamps.thirty_minutes,
  expireIn: Timestamps.eight_hours,
  maxRemitted: 1,
  minPages: 0,
}
