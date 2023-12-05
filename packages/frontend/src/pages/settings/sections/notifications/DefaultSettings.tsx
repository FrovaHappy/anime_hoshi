import { useSettingsContext } from '.'
import { KeysLocalStorage } from '../../../../enum'
import initDb from '../../../../utils/serviceWorker/sw_modules/DBLocal'
import { DEFAULT_NOTIFICATIONS } from '../../../../utils/const'
import { stringToObject } from '../../../../utils/general'
import Option from '../../Option'
const TITLE = 'Restaura Configuración'
export default function DefaultSetting() {
  const { setting, setSetting } = useSettingsContext()
  const notifications = stringToObject(setting?.value)
  if (!notifications) return null
  const onClick = async () => {
    setSetting(await initDb.set(KeysLocalStorage.notifications, JSON.stringify(DEFAULT_NOTIFICATIONS)))
    window.location.reload()
  }
  return (
    <Option
      title={TITLE}
      Actions={
        <button onClick={onClick} className='button__secondary'>
          Restaurar
        </button>
      }
    />
  )
}
