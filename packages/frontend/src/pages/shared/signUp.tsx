import { FormEvent, useEffect, useState } from 'react'
import { useShowComponent, ComponentType } from '../contexts/Sessions'
import { urlApi } from '../../config'
function signUp() {
  const { setShowComponent } = useShowComponent()
  const [signUp, setSingUp] = useState<
    | {
        [k: string]: FormDataEntryValue
      }
    | undefined
  >(undefined)
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const field = Object.fromEntries(new window.FormData(event.target as any))
    setSingUp(field)
  }
  useEffect(() => {
    const initFetch = async () => {
      if (signUp) {
        await fetch(`${urlApi}/user/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(signUp),
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.code === 201) {
              setShowComponent(ComponentType.signin)
            }
          })
          .catch(() => console.log('error'))
      }
    }
    initFetch()
  }, [signUp])

  return (
    <div>
      sign Up
      <form onSubmit={onSubmit}>
        <p>Usuario</p>
        <input required type="text" name="username" id="username" />
        <p>Contraseña</p>
        <input required type="password" name="password" id="password" minLength={8} maxLength={128} />
        <button onClick={() => setShowComponent(ComponentType.children)}>volver</button>
        <button type="submit">Crear Sesión</button>
      </form>
    </div>
  )
}

export default signUp
