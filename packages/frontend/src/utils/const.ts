import { NotificationsInAired } from '../../types'
import { Timestamps } from '../enum'

export const DEFAULT_TOTAL_PAGES = 5
export const DEFAULT_NOTIFICATIONS: NotificationsInAired = {
  delay: Timestamps.eight_hours,
  inAwaits: [],
  maxRemitted: 1,
  sendWhereFind: 0,
}
