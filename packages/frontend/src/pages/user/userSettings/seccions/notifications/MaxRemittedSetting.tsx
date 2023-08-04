import { useState } from 'react'
import { DEFAULT_NOTIFICATIONS, DEFAULT_TOTAL_PAGES } from '../../../../../utils/const'
import { KeysLocalStorage } from '../../../../../enum'
import { NotificationsInAired } from '../../../../../../types'
import { getObjectOfLocaleStorage } from '../../../../../utils/general'
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
  const notifications = getObjectOfLocaleStorage<NotificationsInAired>(KeysLocalStorage.notifications)
  const [value, setValue] = useState(notifications?.maxRemitted)
  if (!notifications) return null

  const onHandleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const { maxRemitted } = Object.fromEntries(new FormData(e.currentTarget))
    notifications.maxRemitted = parseInt(maxRemitted as string)
    localStorage.setItem(KeysLocalStorage.notifications, JSON.stringify(notifications))
    setValue(notifications.maxRemitted)
  }
  return (
    <form onChange={(e) => onHandleChange(e)}>
      <select name="maxRemitted" id="maxRemitted" defaultValue={`${value}`}>
        {mappedOptions(DEFAULT_NOTIFICATIONS.maxRemitted, DEFAULT_TOTAL_PAGES).map((elem) => elem)}
      </select>
    </form>
  )
}
