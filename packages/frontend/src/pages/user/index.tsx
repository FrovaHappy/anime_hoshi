import { useState } from 'react'
import Sessions, { ComponentType, useShowComponent } from '../contexts/Sessions'
import SignIn from '../shared/signIn'
import SignUp from '../shared/signUp'
import UserSettings from './userSettings'
import './index.scss'
import Dashboard from './dashboard'
export const enum ToggleTabsName {
  usuario = 'usuario',
  dashboard = 'dashboard',
}
function Children() {
  const [toggleTabs, setToggleTabs] = useState(ToggleTabsName.usuario)
  const ToggleTabs = toggleTabs === ToggleTabsName.usuario ? <UserSettings /> : <Dashboard />
  const activeToggleTab = (tabName: ToggleTabsName) =>
    toggleTabs === tabName ? 'main__tab main__tab--active' : 'main__tab'
  return (
    <>
      <div className='main__tabs'>
        <button
          onClick={() => {
            setToggleTabs(ToggleTabsName.usuario)
          }}
          className={activeToggleTab(ToggleTabsName.usuario)}>
          Usuario
        </button>
        <button
          onClick={() => {
            setToggleTabs(ToggleTabsName.dashboard)
          }}
          className={activeToggleTab(ToggleTabsName.dashboard)}>
          Dashboard
        </button>
      </div>
      {ToggleTabs}
    </>
  )
}
function ToggleSessions() {
  const { showComponent } = useShowComponent()

  return (
    <div className='main'>
      {showComponent === ComponentType.children ? <Children /> : null}
      {showComponent === ComponentType.signIn ? <SignIn /> : null}
      {showComponent === ComponentType.signUp ? <SignUp /> : null}
    </div>
  )
}
function index() {
  return (
    <Sessions>
      <ToggleSessions />
    </Sessions>
  )
}

export default index
