import type React from 'react'
import { DEFAULT_NOTIFICATIONS, DEFAULT_TOTAL_PAGES } from '../../../../utils/const'
import { KeysLocalStorage } from '../../../../enum'
import { type NotificationsInAired } from '../../../../../types'
import { stringToObject } from '../../../../utils/general'
import initDb from '../../../../utils/serviceWorker/sw_modules/DBLocal'
import { useCanNotificationsContext, useSettingsContext } from '.'
import Option from '../../Option'

const TITLE = 'Cantidad de notificaciones por Anime'
const DESCRIPTION =
  'Controla la cantidad de Notificaciones que se envían por anime, esto es valido dentro de las 8 horas.'

function mappedOptions(min: number, max: number) {
  const options: React.ReactElement[] = []
  for (let i = min; i <= max; i++) {
    options.push(
      <option value={i} key={i}>
        {i} Notif.
      </option>
    )
  }
  return options
}
export default function MaxRemittedSetting() {
  const { setting, setSetting } = useSettingsContext()
  const { canSendNotification } = useCanNotificationsContext()
  if (!canSendNotification) return null

  const notifications = stringToObject<NotificationsInAired>(setting?.value)
  if (!notifications) return null

  const onHandleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const maxRemitted = parseInt(e.target.value)
    notifications.maxRemitted = maxRemitted
    setSetting(await initDb.set(KeysLocalStorage.notifications, JSON.stringify(notifications)))
  }
  return (
    <Option
      title={TITLE}
      description={DESCRIPTION}
      Actions={
        <select
          onChange={onHandleChange}
          className='input__max125'
          title='maxRemitted'
          defaultValue={notifications.maxRemitted}>
          {mappedOptions(DEFAULT_NOTIFICATIONS.maxRemitted, DEFAULT_TOTAL_PAGES).map(elem => elem)}
        </select>
      }
    />
  )
}
