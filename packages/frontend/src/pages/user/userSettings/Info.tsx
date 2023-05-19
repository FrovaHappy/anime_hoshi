import { ErrorTypes } from '../utils/getUser'
import { ComponentType, useShowComponent } from '../../contexts/Sessions'
function UserTarget() {
  return (
    <div className="userTarget">
      <img className="userTarget__img" src="./user.png" alt="imagen del usuario" loading="lazy" />
      <p className="userTarget__username">Frova</p>
      <button>Cambiar Password</button>
    </div>
  )
}
function UserEmpty() {
  const { setShowComponent } = useShowComponent()
  return (
    <>
      <h3>Perfil de Usuario</h3>
      <UserTarget />
      <div className="user__options--rigth">
        <button onClick={() => setShowComponent(ComponentType.signin)}>signIn</button>
        <button onClick={() => setShowComponent(ComponentType.signup)}>signUp</button>
      </div>
    </>
  )
}

function UserValid() {
  const { setShowComponent } = useShowComponent()
  return (
    <>
      <h3 className="user__title">Perfil de Usuario</h3>
      <div className="user__options--rigth">
        <button onClick={() => setShowComponent(ComponentType.signin)}>Cambiar De Usuario</button>
      </div>
    </>
  )
}
export default function index({ error }: { data: any; error: ErrorTypes | undefined }) {
  const { setShowComponent } = useShowComponent()
  if (error === ErrorTypes.tokenNotFound) {
    return <UserEmpty />
  }
  if (error === ErrorTypes.tokenInvalid) {
    return (
      <>
        tokenInvalid
        <button onClick={() => setShowComponent(ComponentType.signin)}>Iniciar Sesion</button>
      </>
    )
  }
  if (error === ErrorTypes.requestError) {
    return <>requestError</>
  }
  return <UserValid />
}
