import type React from 'react'
import { KeysLocalStorage } from '../../../../../enum'
import { stringToObject } from '../../../../../utils/general'
import { type NotificationsInAired } from '../../../../../../types'
import initDb from '../../../../../utils/serviceWorker/sw_modules/DBLocal'
import { useSettingsContext } from '.'

function mappedOptions(min: number, max: number) {
  const options: React.ReactElement[] = []
  for (let i = min; i <= max; i += 15) {
    options.push(
      <option value={i} key={i}>
        {i} Min.
      </option>
    )
  }
  return options
}
export default function DelaySetting() {
  const { setting, setSetting } = useSettingsContext()
  const notifications = stringToObject<NotificationsInAired>(setting?.value)
  if (!notifications) return null

  const onHandleDelay = async (e: React.FocusEvent<HTMLSelectElement>) => {
    const delay = parseInt(e.target.value)
    const test = (n: number) => n >= 0 && n <= 120
    if (!test(delay)) return
    notifications.delay = delay * 60000
    setSetting(await initDb.set(KeysLocalStorage.notifications, JSON.stringify(notifications)))
  }
  return (
    <select className='input__select' onChange={onHandleDelay} title='delay' defaultValue={notifications.delay / 60000}>
      {mappedOptions(0, 120)}
    </select>
  )
}
