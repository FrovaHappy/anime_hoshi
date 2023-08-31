import { type NotificationsInAired } from '../../types'
import { Timestamps } from '../enum'

export const DEFAULT_TOTAL_PAGES = 5
export const DEFAULT_NOTIFICATIONS: NotificationsInAired = {
  delay: Timestamps.fifteen_minutes,
  expireIn: Timestamps.eight_hours,
  maxRemitted: 0,
  minPages: 0
}
export const REGEX_PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
