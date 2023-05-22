import { useState } from 'react'
import Sessions, { ComponentType, useShowComponent } from '../contexts/Sessions'
import SignIn from '../shared/signIn'
import SignUp from '../shared/signUp'
import UserSettings from './userSettings'
import './index.scss'
export const enum TogleTabsName {
  usuario = 'usuario',
  dashboard = 'dashboard',
}
function Children() {
  const [togleTabs, setTogleTabs] = useState(TogleTabsName.usuario)
  const TogleTabs = togleTabs === TogleTabsName.usuario ? <UserSettings /> : <div> dashboard </div>
  return (
    <>
      <div className="main__tabs">
        <button onClick={() => setTogleTabs(TogleTabsName.usuario)}>Usuario</button>
        <button onClick={() => setTogleTabs(TogleTabsName.dashboard)}>Dashboard</button>
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