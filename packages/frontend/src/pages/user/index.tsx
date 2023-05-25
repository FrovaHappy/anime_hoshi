import { useState } from 'react'
import Sessions, { ComponentType, useShowComponent } from '../contexts/Sessions'
import SignIn from '../shared/signIn'
import SignUp from '../shared/signUp'
import UserSettings from './userSettings'
import './index.scss'
import Dashboard from './dashboard'
export const enum TogleTabsName {
  usuario = 'usuario',
  dashboard = 'dashboard',
}
function Children() {
  const [togleTabs, setTogleTabs] = useState(TogleTabsName.usuario)
  const TogleTabs = togleTabs === TogleTabsName.usuario ? <UserSettings /> : <Dashboard />
  const activeTogleTab = (tabName: TogleTabsName) =>
    togleTabs === tabName ? 'main__tab main__tab--active' : 'main__tab'
  return (
    <>
      <div className="main__tabs">
        <button onClick={() => setTogleTabs(TogleTabsName.usuario)} className={activeTogleTab(TogleTabsName.usuario)}>
          Usuario
        </button>
        <button
          onClick={() => setTogleTabs(TogleTabsName.dashboard)}
          className={activeTogleTab(TogleTabsName.dashboard)}
        >
          Dashboard
        </button>
      </div>
      <div className="main__body">{TogleTabs}</div>
    </>
  )
}
function TogleSessions() {
  const { showComponent } = useShowComponent()

  return (
    <div className="main">
      {showComponent === ComponentType.children ? <Children /> : null}
      {showComponent === ComponentType.signin ? <SignIn /> : null}
      {showComponent === ComponentType.signup ? <SignUp /> : null}
    </div>
  )
}
function index() {
  return (
    <Sessions>
      <TogleSessions />
    </Sessions>
  )
}

export default index
