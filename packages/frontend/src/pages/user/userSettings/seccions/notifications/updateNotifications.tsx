import { useState } from 'react'
import { subscribe } from '../../../../../utils/swSubscribe'
import { KeysLocalStorage } from '../../../../../enum'
import { DEFAULT_NOTIFICATIONS } from '../../../../../utils/const'

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
          localStorage.setItem(KeysLocalStorage.notifications, JSON.stringify(DEFAULT_NOTIFICATIONS))
          setLoad(false)
        })
      }}
    >
      {load ? <p>. . . </p> : <p>Solo Actualizar</p>}
    </button>
  )
}

export default updateNotifications
