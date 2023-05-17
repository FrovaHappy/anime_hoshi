import Sessions, { ComponentType, useShowComponent } from '../contexts/Sessions'
import SignIn from '../shared/signIn'
import SignUp from '../shared/signUp'

function User() {
  const { showComponent, setShowComponent } = useShowComponent()
  return (
    <div>
      {showComponent}
      <button onClick={() => setShowComponent(ComponentType.signin)}>signIn</button>
      <button onClick={() => setShowComponent(ComponentType.signup)}>signUp</button>
    </div>
  )
}
function TogleSessions() {
  const { showComponent } = useShowComponent()
  return (
    <>
      {showComponent === ComponentType.children ? User() : null}
      {showComponent === ComponentType.signin ? SignIn() : null}
      {showComponent === ComponentType.signup ? SignUp() : null}
    </>
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
