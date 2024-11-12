import type React from 'react'
import { subscribe, unsubscribe, type Messages } from '../../../../utils/swSubscribe'
import Icons from '../../../../Icons'
import { useState } from 'react'
import Option from '../../Option'
const TITLE = 'Recibir Notificaciones'
interface Props {
  canNotification: boolean
  setCanNotification: (k: boolean) => void
}
function Status({ isError, message }: Messages) {
  if (message === '') return undefined
  return (
    <span className='optionNotification'>
      <Icons iconName={isError ? 'Error' : 'Check'} className='optionNotification__icon' />
      {message}
    </span>
  )
}
interface SwitchPermissionsProps extends Props {
  setMessage: (message: Messages) => void
}
function SwitchPermissions({ canNotification, setCanNotification, setMessage }: SwitchPermissionsProps) {
  const handlerClick = async (e: React.MouseEvent<HTMLInputElement>) => {
    const ref = e.currentTarget
    if (ref.checked) {
      const result = await subscribe()
      if (result.isError) ref.checked = false
      setMessage(result)
    } else {
      await unsubscribe()
      ref.checked = false
    }
    setCanNotification(ref.checked)
  }
  return (
    <label className='switch optionSetting__action'>
      <input type='checkbox' onClick={handlerClick} defaultChecked={canNotification} />
      <span className='slider' />
    </label>
  )
}
export default function SetNotifications({ canNotification, setCanNotification }: Props) {
  const [message, setMessage] = useState({ isError: false, message: '' })

  return (
    <Option
      title={TITLE}
      Status={<Status isError={message.isError} message={message.message} />}
      Actions={
        <SwitchPermissions
          setMessage={setMessage}
          canNotification={canNotification}
          setCanNotification={setCanNotification}
        />
      }
    />
  )
}
