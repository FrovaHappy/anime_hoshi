import type React from 'react'
import { DEFAULT_NOTIFICATIONS, DEFAULT_TOTAL_PAGES } from '../../../../../utils/const'
import { KeysLocalStorage } from '../../../../../enum'
import { type NotificationsInAired } from '../../../../../../types'
import { stringToObject } from '../../../../../utils/general'
import { useSettingsContext } from '.'
import initDb from '../../../../../utils/DBLocal'
import { useMemo, useState } from 'react'
function mappedOptions(min: number, max: number) {
  const options: React.ReactElement[] = []
  for (let i = min; i <= max; i++) {
    options.push(
      <option value={i} key={i}>
        {i}
      </option>
    )
  }
  return options
}
export default function MaxRemittedSetting() {
  const { setting, setSetting } = useSettingsContext()
  const notifications = stringToObject<NotificationsInAired>(setting?.value)
  const [value, setValue] = useState(notifications?.maxRemitted ?? NaN)
  if (!notifications) return null

  const onHandleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const maxRemitted = parseInt(e.target.value)
    setValue(maxRemitted)
    notifications.maxRemitted = maxRemitted
    setSetting(await initDb.set(KeysLocalStorage.notifications, JSON.stringify(notifications)))
  }
  useMemo(() => {
    setValue(notifications.maxRemitted)
  }, [setting])
  return (
    <select onChange={onHandleChange} className='input__select' title='maxRemitted' name='maxRemitted' value={value}>
      {mappedOptions(DEFAULT_NOTIFICATIONS.maxRemitted, DEFAULT_TOTAL_PAGES).map(elem => elem)}
    </select>
  )
}
