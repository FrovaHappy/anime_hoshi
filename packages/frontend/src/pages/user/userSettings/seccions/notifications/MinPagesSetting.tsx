import React, { useState } from 'react'
import { getObjectOfLocaleStorage } from '../../../../../utils/general'
import { NotificationsInAired } from '../../../../../../types'
import { KeysLocalStorage } from '../../../../../enum'
import { DEFAULT_NOTIFICATIONS, DEFAULT_TOTAL_PAGES } from '../../../../../utils/const'

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
export default function mimPagesSetting() {
  const notifications = getObjectOfLocaleStorage<NotificationsInAired>(KeysLocalStorage.notifications)
  const [value, setValue] = useState(notifications?.minPages)
  if (!notifications) return null
  const onHandleMaxPages = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { minPages } = Object.fromEntries(new FormData(e.currentTarget))
    notifications.minPages = parseInt(minPages as string)
    localStorage.setItem(KeysLocalStorage.notifications, JSON.stringify(notifications))
    setValue(notifications.minPages)
  }
  return (
    <form onChange={(e) => onHandleMaxPages(e)}>
      <select name="minPages" id="minPages" defaultValue={value}>
        {mappedOptions(DEFAULT_NOTIFICATIONS.minPages, DEFAULT_TOTAL_PAGES).map((elem) => elem)}
      </select>
    </form>
  )
}
