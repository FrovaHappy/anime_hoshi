import { KeysLocalStorage } from '../../../../../enum'
import { DEFAULT_NOTIFICATIONS } from '../../../../../utils/const'
import { useNavigate } from 'react-router-dom'
import op from './'
import { getObjectOfLocaleStorage } from '../../../../../utils/general'
export default function defaultSetting() {
  const notifications = getObjectOfLocaleStorage(KeysLocalStorage.notifications)
  const nav = useNavigate()
  if (!notifications) return null
  const onClick = () => {
    localStorage.setItem(KeysLocalStorage.notifications, JSON.stringify(DEFAULT_NOTIFICATIONS))
    nav(`/setting#${op.tag}`)
  }
  return (
    <button onClick={() => onClick()} className="button">
      Restaurar
    </button>
  )
}
