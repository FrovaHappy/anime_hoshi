import { type FormEvent, type MouseEvent, useState } from 'react'
import { type ObjectDynamic } from '../../../types'
import useFetch from '../../hooks/useFetchNew'
import { urlApi } from '../../config'
import { KeysLocalStorage } from '../../enum'
import { isValidInput } from '../../utils/general'
import { MESSAGE_PASSWORD, REGEX_PASSWORD } from '../../utils/const'
import './sign.style.scss'
import { useNavigate } from 'react-router-dom'
import Icons from '../../Icons'
import { TargetError } from './components/TargetError'
import { type ApiPostUserSingIn } from '../../../../types/ApiResponse'

function signIn() {
  const navigate = useNavigate()
  const [signIn, setSignIn] = useState<ObjectDynamic<FormDataEntryValue> | undefined>(undefined)
  const { contents, error } = useFetch<ApiPostUserSingIn>({
    query: { url: `${urlApi}/user/signin`, method: 'POST', body: signIn },
    conditional: !!signIn,
    deps: [signIn]
  })
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const field = Object.fromEntries(new window.FormData(event.target as HTMLFormElement | undefined))
    setSignIn(field)
  }
  if (contents) {
    window.localStorage.setItem(KeysLocalStorage.token, contents.newToken)
    navigate('/')
  }
  const onShowPassword = (event: MouseEvent<SVGSVGElement>) => {
    const input = event.currentTarget.parentElement?.querySelector('input')
    if (!input) return
    if (input.type === 'password') {
      input.type = 'text'
    } else {
      input.type = 'password'
    }
    event.currentTarget.classList.toggle('signForm__input--passwordShow')
  }
  return (
    <div className='sign'>
      <form className='signForm' onSubmit={onSubmit}>
        <h1>LogIn</h1>
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
          <Icons className='signForm__input--icon' iconName='Person' />
        </div>
        <div className='signForm__input inputBox'>
          <input
            required
            className='input'
            type='password'
            name='password'
            placeholder='Contraseña'
            onChange={e => {
              isValidInput(e, REGEX_PASSWORD, MESSAGE_PASSWORD)
            }}
          />
          <Icons className='signForm__input--icon' iconName='Eye' onClick={onShowPassword} />
        </div>
        <TargetError error={error} />
        <button className='button signForm__button' type='submit'>
          Iniciar Sesión
        </button>
        <span className='signForm__button' />
        <div className='signForm__contents'>
          <button
            type='button'
            className='button__withoutBorder signForm__button'
            onClick={() => {
              navigate('/')
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
