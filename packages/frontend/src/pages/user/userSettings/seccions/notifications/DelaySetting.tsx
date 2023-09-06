import type React from 'react'
import { KeysLocalStorage } from '../../../../../enum'
import { isValidInput, stringToObject } from '../../../../../utils/general'
import { type NotificationsInAired } from '../../../../../../types'
import initDb from '../../../../../utils/serviceWorker/sw_modules/DBLocal'
import { useSettingsContext } from '.'
import { useState } from 'react'

export default function DelaySetting() {
  const { setting, setSetting } = useSettingsContext()
  const notifications = stringToObject<NotificationsInAired>(setting?.value)
  const [value, setValue] = useState((notifications?.delay ?? 0) / 60000)
  if (!notifications) return null
  const onHandleDelay = async (e: React.FocusEvent<HTMLInputElement>) => {
    isValidInput(e)
    const delay = parseInt(e.target.value)
    setValue(delay)
    const test = (n: number) => n >= 0 && n <= 120
    if (!test(value)) return
    notifications.delay = delay * 60000
    setSetting(await initDb.set(KeysLocalStorage.notifications, JSON.stringify(notifications)))
  }
  // useMemo(() => {
  //   setValue(notifications.delay / 60000)
  // }, [setting])
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
      value={value}
      placeholder='0'
    />
  )
}
