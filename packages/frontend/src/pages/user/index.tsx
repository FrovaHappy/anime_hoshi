import Sessions, { ComponentType, useShowComponent } from '../contexts/Sessions'
import SignIn from '../shared/signIn'
import SignUp from '../shared/signUp'
import UserSettings from './userSettings'
import './index.scss'
function Children() {
  return (
    <>
      <UserSettings />
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
