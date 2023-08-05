import React, { useState } from 'react'
import { KeysLocalStorage, Timestamps } from '../../../../../enum'
import { getObjectOfLocaleStorage } from '../../../../../utils/general'
import { NotificationsInAired } from '../../../../../../types'

export default function DelaySetting() {
  const notifications = getObjectOfLocaleStorage<NotificationsInAired>(KeysLocalStorage.notifications)
  const [value, setValue] = useState(notifications?.delay)
  if (!notifications) return null
  const onHandleDelay = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let { delay } = Object.fromEntries(new FormData(e.currentTarget))
    if (parseInt(delay as string) < Timestamps.fifteen_minutes) return
    notifications.delay = parseInt(delay as string)
    localStorage.setItem(KeysLocalStorage.notifications, JSON.stringify(notifications))
    setValue(notifications.delay)
  }
  return (
    <form onSubmit={(e) => onHandleDelay(e)} onChange={(e) => onHandleDelay(e)}>
      <input type="number" min={Timestamps.fifteen_minutes} name="delay" id="delay" defaultValue={value} />
    </form>
  )
}
