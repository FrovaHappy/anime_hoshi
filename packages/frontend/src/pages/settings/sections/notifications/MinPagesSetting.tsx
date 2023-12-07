import type React from 'react'
import { stringToObject } from '../../../../utils/general'
import { type NotificationsInAired } from '../../../../../types'
import { KeysLocalStorage } from '../../../../enum'
import { DEFAULT_NOTIFICATIONS, DEFAULT_TOTAL_PAGES } from '../../../../utils/const'
import { useCanNotificationsContext, useSettingsContext } from '.'
import initDb from '../../../../utils/serviceWorker/sw_modules/DBLocal'
import Option from '../../Option'

const TITLE = 'Cantidad minima de paginas por Notificaciones'
const DESCRIPTION = 'Si se cumple la condición, este enviara inmediatamente la notificación.'

function mappedOptions(min: number, max: number) {
  const options: React.ReactElement[] = []
  for (let i = min; i <= max; i++) {
    options.push(
      <option value={i} key={i}>
        {i} Pag.
      </option>
    )
  }
  return options
}
export default function MimPagesSetting() {
  const { setting, setSetting } = useSettingsContext()
  const { canSendNotification } = useCanNotificationsContext()
  if (!canSendNotification) return null

  const notifications = stringToObject<NotificationsInAired>(setting?.value)
  if (!notifications) return null
  const onHandleMaxPages = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    const minPages = parseInt(e.target.value)
    notifications.minPages = minPages
    setSetting(await initDb.set(KeysLocalStorage.notifications, JSON.stringify(notifications)))
  }
  return (
    <Option
      title={TITLE}
      description={DESCRIPTION}
      Actions={
        <select
          onChange={onHandleMaxPages}
          className='input__max125'
          title='minPages'
          defaultValue={notifications.minPages}>
          {mappedOptions(DEFAULT_NOTIFICATIONS.minPages, DEFAULT_TOTAL_PAGES).map(elem => elem)}
        </select>
      }
    />
  )
}
