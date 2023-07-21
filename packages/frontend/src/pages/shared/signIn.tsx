import { type FormEvent, useEffect, useState } from 'react'
import { useShowComponent, ComponentType } from '../contexts/Sessions'
import { type ObjectDynamic } from '../../../types'
import useFetch from '../../hooks/useFetch'
import { urlApi } from '../../config'
import { KeysLocalStorage } from '../../enum'

function signIn() {
  const { setShowComponent } = useShowComponent()
  const [signIn, setSignIn] = useState<ObjectDynamic<FormDataEntryValue> | undefined>(undefined)
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
        if (response?.code === 200) {
          window.localStorage.setItem(KeysLocalStorage.token, response.contents.token)
          setShowComponent(ComponentType.children)
          return
        }
        if (response?.code === 403) {
          setError(response.message)
          return
        }
        setError('Error en la petición.')
      }
    }
    initFetch().catch(() => {})
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
        <button
          onClick={() => {
            setShowComponent(ComponentType.children)
          }}
        >
          volver
        </button>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  )
}

export default signIn
