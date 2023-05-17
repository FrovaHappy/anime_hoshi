import { FormEvent } from 'react'
import { useShowComponent, ComponentType } from '../contexts/Sessions'

function onSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()
  const field = Object.fromEntries(new window.FormData(event.target as any))
  console.log(field)
}
function signIn() {
  const { setShowComponent } = useShowComponent()
  return (
    <div>
      signIn
      <form onSubmit={onSubmit}>
        <p>Usuario</p>
        <input required type="text" name="user" id="user" />
        <p>Contraseña</p>
        <input required type="password" name="password" id="password" minLength={8} maxLength={128} />
        <button onClick={() => setShowComponent(ComponentType.children)}>volver</button>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  )
}

export default signIn
