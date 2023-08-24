import type React from 'react'
import { stringToObject } from '../../../../../utils/general'
import { type NotificationsInAired } from '../../../../../../types'
import { KeysLocalStorage } from '../../../../../enum'
import { DEFAULT_NOTIFICATIONS, DEFAULT_TOTAL_PAGES } from '../../../../../utils/const'
import { useSettingsContext } from '.'
import initDb from '../../../../../utils/DBLocal'

function mappedOptions(min: number, max: number) {
  const options: React.ReactElement[] = []
  for (let i = min; i <= max; i++) {
    options.push(
      <option value={i} key={i}>
        {i}
      </option>,
    )
  }
  return options
}
export default function mimPagesSetting() {
  const { setting, setSetting } = useSettingsContext()
  const notifications = stringToObject<NotificationsInAired>(setting?.value)
  if (!notifications) return null
  const onHandleMaxPages = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { minPages } = Object.fromEntries(new FormData(e.currentTarget))
    notifications.minPages = parseInt(minPages as string)
    setSetting(await initDb.set(KeysLocalStorage.notifications, JSON.stringify(notifications)))
  }
  return (
    <form onChange={onHandleMaxPages}>
      <select className='input__select' name='minPages' title='minPages' defaultValue={notifications.minPages}>
        {mappedOptions(DEFAULT_NOTIFICATIONS.minPages, DEFAULT_TOTAL_PAGES).map(elem => elem)}
      </select>
    </form>
  )
}
