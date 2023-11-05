import { type FormEvent, useState } from 'react'
import { useShowComponent, ComponentType } from '../contexts/Sessions'
import { type ObjectDynamic } from '../../../types'
import useFetch from '../../hooks/useFetchNew'
import { urlApi } from '../../config'
import { KeysLocalStorage } from '../../enum'
import { isValidInput } from '../../utils/general'
import { REGEX_PASSWORD } from '../../utils/const'
import './sign.style.scss'

function signIn() {
  const { setShowComponent } = useShowComponent()
  const [signIn, setSignIn] = useState<ObjectDynamic<FormDataEntryValue> | undefined>(undefined)
  const { contents, error } = useFetch({
    query: { url: `${urlApi}/user/signin`, method: 'POST', body: signIn },
    conditional: !!signIn,
    deps: [signIn]
  })
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const field = Object.fromEntries(new window.FormData(event.target as any))
    setSignIn(field)
  }
  if (contents) {
    window.localStorage.setItem(KeysLocalStorage.token, contents.newToken)
    setShowComponent(ComponentType.children)
  }
  return (
    <div className='sign'>
      <form className='signForm' onSubmit={onSubmit}>
        <h1 className='signForm__title'>signIn</h1>
        <input
          required
          className='input'
          type='text'
          name='username'
          minLength={6}
          autoComplete='off'
          placeholder='Usuario'
          onChange={isValidInput}
        />
        <input
          required
          className='input__password'
          type='password'
          name='password'
          placeholder='Contraseña'
          onChange={e => {
            isValidInput(e, REGEX_PASSWORD)
          }}
        />
        {error !== '' ? <p>{error}</p> : null}

        <button className='button' type='submit'>
          Iniciar Sesión
        </button>
        <p>ó</p>
        <div className='signForm__contents'>
          <button
            type='button'
            className='button__secondary'
            onClick={() => {
              setShowComponent(ComponentType.children)
            }}>
            volver
          </button>
          <button
            type='button'
            className='button__secondary'
            onClick={() => {
              setShowComponent(ComponentType.signUp)
            }}>
            Crear Usuario
          </button>
        </div>
      </form>
    </div>
  )
}

export default signIn
