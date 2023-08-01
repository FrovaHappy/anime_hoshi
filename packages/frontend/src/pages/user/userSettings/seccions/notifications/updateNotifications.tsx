import { useState } from 'react'
import { subscribe } from '../../../../../utils/swSubscribe'
import { KeysLocalStorage, Timestamps } from '../../../../../enum'
import { NotificationsInAired } from '../../../../../../types'

function updateNotifications() {
  const publicKey = localStorage.getItem(KeysLocalStorage.publicKey)
  const [load, setLoad] = useState(false)

  if (!publicKey) return null

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
      {load ? <p>. . . </p> : <p>Solo Actualizar</p>}
    </button>
  )
}

export default updateNotifications
