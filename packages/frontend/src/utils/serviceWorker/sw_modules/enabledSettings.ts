import type { EnabledSettings, InAwait, NotificationsInAired } from '../../../../types'

export interface EnabledSettingsProps {
  timeNow: number
  inAwait: InAwait
  settings: NotificationsInAired
}
export default function enabledSettings(props: EnabledSettingsProps): EnabledSettings {
  const { inAwait, settings, timeNow } = props
  return {
    expiredDelay: settings.delay + inAwait.created < timeNow,
    expiredNotification: settings.expireIn + inAwait.created < timeNow,
    remittedRange: settings.maxRemitted >= inAwait.cantRemitted,
    satisfiesMinPages: settings.minPages <= inAwait.anime.namePages.length
  }
}
