import { type FormEvent, useEffect, useState } from 'react'
import { useShowComponent, ComponentType } from '../contexts/Sessions'
import { urlApi } from '../../config'
import useFetch from '../../hooks/useFetch'
import { type ObjectDynamic } from '../../../types'
function signUp() {
  const { setShowComponent } = useShowComponent()
  const [signUp, setSingUp] = useState<ObjectDynamic<FormDataEntryValue> | undefined>(undefined)
  const [error, setError] = useState<string>('')
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const field = Object.fromEntries(new window.FormData(event.target as any))
    setSingUp(field)
  }
  useEffect(() => {
    const initFetch = async () => {
      if (signUp) {
        const response = await useFetch({ url: `${urlApi}/user/signup`, method: 'POST', body: signUp })
        if (response?.code === 201) {
          setShowComponent(ComponentType.signin)
          return
        }
        if (response?.code === 400) {
          setError(response.message)
          return
        }
        setError('Error en la petición.')
      }
    }
    initFetch().catch(() => {})
  }, [signUp])

  return (
    <div>
      sign Up
      <form onSubmit={onSubmit}>
        <p>Usuario</p>
        <input required type="text" name="username" id="username" />
        <p>Contraseña</p>
        <input required type="password" name="password" id="password" minLength={8} maxLength={128} />
        {error !== '' ? <p>{error}</p> : null}
        <button
          onClick={() => {
            setShowComponent(ComponentType.children)
          }}
        >
          volver
        </button>
        <button type="submit">Crear Sesión</button>
      </form>
    </div>
  )
}

export default signUp
