import { useState } from 'react'
import { subscribe } from '../../../../utils/swSubscribe'
import { KeysLocalStorage } from '../../../../enum'
import { DEFAULT_NOTIFICATIONS } from '../../../../utils/const'
import initDb from '../../../../utils/serviceWorker/sw_modules/DBLocal'
import Option from '../../Option'

const TITLE = 'Sincronizar Permisos'
const DESCRIPTION = 'Renueva los permisos, en caso de experimentar problemas y no recibir notificaciones.'

function ButtonUpdate() {
  const publicKey = localStorage.getItem(KeysLocalStorage.publicKey)
  const [load, setLoad] = useState(false)

  if (!publicKey) return null
  if (load) return <button className='button__secondary'>. . .</button>
  return (
    <button
      className='button__secondary'
      disabled={load}
      onClick={async () => {
        setLoad(true)
        await subscribe().then(async () => {
          await initDb.set(KeysLocalStorage.notifications, JSON.stringify(DEFAULT_NOTIFICATIONS))
          setLoad(false)
        })
      }}>
      Sincronizar
    </button>
  )
}

export default function UpdateNotifications() {
  return <Option title={TITLE} description={DESCRIPTION} Actions={<ButtonUpdate />} />
}
