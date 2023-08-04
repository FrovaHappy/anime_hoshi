import { useState } from 'react'
import { KeysLocalStorage } from '../../../../../enum'
import { subscribe, unsubscribe } from '../../../../../utils/swSubscribe'
import UpdateNotifications from './updateNotifications'
import { DEFAULT_NOTIFICATIONS } from '../../../../../utils/const'

export default function setNotifications() {
  const notificationsString = window.localStorage.getItem(KeysLocalStorage.notifications)
  const [load, setLoad] = useState(false)
  if (notificationsString) {
    return (
      <>
        <UpdateNotifications />
        <button
          className="button__red"
          onClick={() => {
            setLoad(true)
            unsubscribe().then(() => {
              setLoad(false)
              localStorage.removeItem(KeysLocalStorage.notifications)
              localStorage.removeItem(KeysLocalStorage.publicKey)
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
        subscribe().then(() => {
          localStorage.setItem(KeysLocalStorage.notifications, JSON.stringify(DEFAULT_NOTIFICATIONS))
          setLoad(false)
        })
      }}
    >
      {load ? <p>. . . </p> : <p>Suscribirse</p>}
    </button>
  )
}
