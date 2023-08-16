import { useState } from 'react'
import { KeysLocalStorage } from '../../../../../enum'
import { subscribe, unsubscribe } from '../../../../../utils/swSubscribe'
import UpdateNotifications from './updateNotifications'
import { DEFAULT_NOTIFICATIONS } from '../../../../../utils/const'
import { PropReloadComponent, useSettingsContext } from '.'
import initDb from '../../../../../utils/DBLocal'

export default function setNotifications({ reload }: PropReloadComponent) {
  const { setting, setSetting } = useSettingsContext()
  const notificationsString = setting?.value
  const [load, setLoad] = useState(false)
  if (notificationsString) {
    return (
      <>
        <UpdateNotifications />
        <button
          className="button__red"
          onClick={() => {
            setLoad(true)
            unsubscribe().then(async () => {
              setLoad(false)
              localStorage.removeItem(KeysLocalStorage.publicKey)
              setSetting(await initDb().delete(KeysLocalStorage.notifications))
              reload()
            })
          }}
        >
          {load ? <p> . . . </p> : <p>Borrar la suscripción</p>}
        </button>
      </>
    )
  }
  return (
    <button
      className="button__blue"
      onClick={() => {
        setLoad(true)
        subscribe().then(async () => {
          setSetting(await initDb().set(KeysLocalStorage.notifications, JSON.stringify(DEFAULT_NOTIFICATIONS)))
          setLoad(false)
          reload()
        })
      }}
    >
      {load ? <p>. . . </p> : <p>Suscribirse</p>}
    </button>
  )
}
