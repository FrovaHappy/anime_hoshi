import { useState } from 'react'
import { type Messages, subscribe } from '../../../../utils/swSubscribe'
import { KeysLocalStorage } from '../../../../enum'
import Option from '../../Option'
import { useCanNotificationsContext } from '.'
import Icons from '../../../../Icons'

const TITLE = 'Sincronizar Permisos'
const DESCRIPTION = 'Renueva los permisos, en caso de experimentar problemas y no recibir notificaciones.'

function Status({ isError, message }: Messages) {
  if (message === '') return undefined
  return (
    <span className='optionNotification'>
      <Icons iconName={isError ? 'Error' : 'Check'} className='optionNotification__icon' />
      {message}
    </span>
  )
}

function ButtonUpdate({ setMessage }: { setMessage: (k: Messages) => void }) {
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
        await subscribe().then(async msg => {
          setMessage(msg)
          setLoad(false)
        })
      }}>
      Sincronizar
    </button>
  )
}

export default function UpdateNotifications() {
  const [message, setMessage] = useState({ isError: false, message: '' })
  const { canSendNotification } = useCanNotificationsContext()

  if (!canSendNotification) return null

  return (
    <Option
      title={TITLE}
      description={DESCRIPTION}
      Status={<Status isError={message.isError} message={message.message} />}
      Actions={<ButtonUpdate setMessage={setMessage} />}
    />
  )
}
