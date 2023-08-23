import type React from 'react'
import { KeysLocalStorage } from '../../../../../enum'
import { stringToObject } from '../../../../../utils/general'
import { type NotificationsInAired } from '../../../../../../types'
import initDb from '../../../../../utils/DBLocal'
import { useSettingsContext } from '.'

export default function DelaySetting() {
  const { setting, setSetting } = useSettingsContext()
  const notifications = stringToObject<NotificationsInAired>(setting?.value)
  if (!notifications) return null
  const delayInMin = notifications.delay / 60000
  const onHandleDelay = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { delay } = Object.fromEntries(new FormData(e.currentTarget))
    notifications.delay = parseInt(delay as string) * 60000
    setSetting(await initDb.set(KeysLocalStorage.notifications, JSON.stringify(notifications)))
  }
  return (
    <form onSubmit={onHandleDelay} onChange={onHandleDelay}>
      <input
        type='number'
        name='delay'
        id='delay'
        min={0}
        step={1}
        max={120}
        defaultValue={delayInMin}
        placeholder='in minutes'
      />
    </form>
  )
}
