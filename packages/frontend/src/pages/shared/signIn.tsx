import { FormEvent, useEffect, useState } from 'react'
import { useShowComponent, ComponentType } from '../contexts/Sessions'
import { ObjectKeyDynamic } from '../../../types'
import useFetch from '../../hooks/useFetch'
import { urlApi } from '../../config'

function signIn() {
  const { setShowComponent } = useShowComponent()
  const [signIn, setSignIn] = useState<ObjectKeyDynamic<FormDataEntryValue> | undefined>(undefined)
  const [error, setError] = useState<string>('')
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const field = Object.fromEntries(new window.FormData(event.target as any))
    setSignIn(field)
  }
  useEffect(() => {
    const initFetch = async () => {
      if (signIn) {
        const response = await useFetch({ url: `${urlApi}/user/signin`, method: 'POST', body: signIn })
        console.log(response)
        if (response?.code === 200) {
          window.localStorage.setItem('token', response.contents.token)
          return setShowComponent(ComponentType.children)
        }
        if (response?.code === 403) return setError(response.message)
        return setError('Error en la petición.')
      }
    }
    initFetch()
  }, [signIn])

  return (
    <div>
      signIn
      <form onSubmit={onSubmit}>
        <p>Usuario</p>
        <input required type="text" name="username" id="username" />
        <p>Contraseña</p>
        <input required type="password" name="password" id="password" minLength={8} maxLength={128} />
        {error !== '' ? <p>{error}</p> : null}
        <button onClick={() => setShowComponent(ComponentType.children)}>volver</button>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  )
}

export default signIn
