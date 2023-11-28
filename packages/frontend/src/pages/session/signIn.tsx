import { type FormEvent, useState } from 'react'
import { type ObjectDynamic } from '../../../types'
import useFetch from '../../hooks/useFetchNew'
import { urlApi } from '../../config'
import { KeysLocalStorage } from '../../enum'
import { isValidInput } from '../../utils/general'
import { REGEX_PASSWORD } from '../../utils/const'
import './sign.style.scss'
import { useNavigate } from 'react-router-dom'
import Icons from '../../Icons'

function signIn() {
  const navigate = useNavigate()
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
    window.history.back()
  }
  return (
    <div className='sign'>
      <form className='signForm' onSubmit={onSubmit}>
        <h1>Anime Hoshi</h1>
        <h2>Bienvenido</h2>
        <h3>Para ingresar a tu cuenta, inicie sesión.</h3>
        <div className='signForm__input inputBox'>
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
          <Icons iconName='IconBug' />
        </div>
        <div className='signForm__input inputBox'>
          <input
            required
            className='input'
            type='password'
            name='password'
            placeholder='Contraseña'
            onChange={e => {
              isValidInput(e, REGEX_PASSWORD)
            }}
          />
          <Icons iconName='IconBug' />
        </div>
        {error !== '' ? <p>{error}</p> : null}

        <button className='button signForm__button' type='submit'>
          Iniciar Sesión
        </button>
        <span className='signForm__button' />
        <div className='signForm__contents'>
          <button
            type='button'
            className='button__withoutBorder signForm__button'
            onClick={() => {
              window.history.back()
            }}>
            volver
          </button>
          <button
            type='button'
            className='button__secondary signForm__button'
            onClick={() => {
              navigate('/signup')
            }}>
            Crear Usuario
          </button>
        </div>
      </form>
    </div>
  )
}

export default signIn
