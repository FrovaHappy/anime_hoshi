import { createContext, useContext, useEffect, useState } from 'react'
import SetNotifications from './setPermission'
import { KeysLocalStorage } from '../../../../enum'
import type { UseState } from '../../../../../types'
import type { ResultDB } from '../../../../utils/serviceWorker/sw_modules/DBLocal'
import DBLocal from '../../../../utils/serviceWorker/sw_modules/DBLocal'
import DefaultSettings from './DefaultSettings'
import MaxRemittedSetting from './MaxRemittedSetting'
import MinPagesSetting from './MinPagesSetting'
import DelaySetting from './DelaySetting'
import UpdateNotifications from './updateNotifications'
const ContextSettings = createContext<UseState<ResultDB | undefined> | undefined>(undefined)
export function useSettingsContext() {
  const context = useContext(ContextSettings)
  if (!context) throw new Error('Out of Context Settings')
  const [setting, setSetting] = context
  return { setting, setSetting }
}
function getData(setSetting: (k: any) => void) {
  const [load, setLoad] = useState(true)
  useEffect(() => {
    const database = async () => {
      setSetting(await DBLocal.get(KeysLocalStorage.notifications))
      setLoad(false)
    }
    database().catch(e => {
      console.error(e)
      throw new Error('error load Notification id IndexedDb')
    })
  }, [])
  return load
}

function Notifications() {
  // Create variables for notification
  const canSendNotifications = window.localStorage.getItem(KeysLocalStorage.canSendNotification) ?? 'false'
  const [canNotifications, setCanNotification] = useState(JSON.parse(canSendNotifications))
  window.localStorage.setItem(KeysLocalStorage.canSendNotification, JSON.stringify(canNotifications))

  // Create variables for settings and sync datasets
  const [setting, setSetting] = useState<ResultDB>()
  getData(setSetting)

  return (
    <ContextSettings.Provider value={[setting, setSetting]}>
      <section>
        <SetNotifications canNotification={canNotifications} setCanNotification={setCanNotification} />
        <UpdateNotifications />
        <DefaultSettings />
        <DelaySetting />
        <MaxRemittedSetting />
        <MinPagesSetting />
      </section>
    </ContextSettings.Provider>
  )
}

export default {
  title: 'Notifications',
  tag: 'notifications',
  MainComponent: Notifications
}
