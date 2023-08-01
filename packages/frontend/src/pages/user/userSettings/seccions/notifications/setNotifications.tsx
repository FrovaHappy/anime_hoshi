import { useState } from 'react'
import { NotificationsInAired } from '../../../../../../types'
import { KeysLocalStorage, Timestamps } from '../../../../../enum'
import { subscribe, unsubscribe } from '../../../../../utils/swSubscribe'
import UpdateNotifications from './updateNotifications'

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
          const notifications: NotificationsInAired = {
            delay: Timestamps.eight_hours,
            inAwaits: [],
            maxRemitted: 1,
            sendWhereFind: 0,
          }
          localStorage.setItem(KeysLocalStorage.notifications, JSON.stringify(notifications))
          setLoad(false)
        })
      }}
    >
      {load ? <p>. . . </p> : <p>Suscribirse</p>}
    </button>
  )
}
