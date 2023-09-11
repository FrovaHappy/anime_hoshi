import type React from 'react'
import { KeysLocalStorage } from '../../../../../enum'
import { isValidInput, stringToObject } from '../../../../../utils/general'
import { type NotificationsInAired } from '../../../../../../types'
import initDb from '../../../../../utils/serviceWorker/sw_modules/DBLocal'
import { useSettingsContext } from '.'

export default function DelaySetting() {
  const { setting, setSetting } = useSettingsContext()
  const notifications = stringToObject<NotificationsInAired>(setting?.value)
  if (!notifications) return null
  const onHandleDelay = async (e: React.FocusEvent<HTMLInputElement>) => {
    isValidInput(e)
    const delay = parseInt(e.target.value)
    const test = (n: number) => n >= 0 && n <= 120
    if (!test(delay)) return
    notifications.delay = delay * 60000
    setSetting(await initDb.set(KeysLocalStorage.notifications, JSON.stringify(notifications)))
    e.target.value = ''
  }
  return (
    <input
      onChange={onHandleDelay}
      onBlur={onHandleDelay}
      className='input__number'
      type='number'
      name='delay'
      min={0}
      step={1}
      max={120}
      placeholder={(notifications.delay / 60000).toString() + ' min'}
    />
  )
}
