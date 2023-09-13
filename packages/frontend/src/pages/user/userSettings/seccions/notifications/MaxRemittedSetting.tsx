import type React from 'react'
import { DEFAULT_NOTIFICATIONS, DEFAULT_TOTAL_PAGES } from '../../../../../utils/const'
import { KeysLocalStorage } from '../../../../../enum'
import { type NotificationsInAired } from '../../../../../../types'
import { stringToObject } from '../../../../../utils/general'
import { useSettingsContext } from '.'
import initDb from '../../../../../utils/serviceWorker/sw_modules/DBLocal'
function mappedOptions(min: number, max: number) {
  const options: React.ReactElement[] = []
  for (let i = min; i <= max; i++) {
    options.push(
      <option value={i} key={i}>
        {i} Notif.
      </option>
    )
  }
  return options
}
export default function MaxRemittedSetting() {
  const { setting, setSetting } = useSettingsContext()
  const notifications = stringToObject<NotificationsInAired>(setting?.value)
  if (!notifications) return null

  const onHandleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const maxRemitted = parseInt(e.target.value)
    notifications.maxRemitted = maxRemitted
    setSetting(await initDb.set(KeysLocalStorage.notifications, JSON.stringify(notifications)))
  }
  return (
    <select
      onChange={onHandleChange}
      className='input__select'
      title='maxRemitted'
      defaultValue={notifications.maxRemitted}>
      {mappedOptions(DEFAULT_NOTIFICATIONS.maxRemitted, DEFAULT_TOTAL_PAGES).map(elem => elem)}
    </select>
  )
}
