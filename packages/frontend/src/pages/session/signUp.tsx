import type React from 'react'
import { type FormEvent, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { urlApi } from '../../config'
import useFetch from '../../hooks/useFetchNew'
import { type ObjectDynamic } from '../../../types'
import { isValidInput } from '../../utils/general'
import { REGEX_PASSWORD } from '../../utils/const'
function signUp() {
  const navigate = useNavigate()
  const [signUp, setSingUp] = useState<ObjectDynamic<FormDataEntryValue> | undefined>(undefined)
  const { error } = useFetch({
    query: { url: `${urlApi}/user/signup`, method: 'POST', body: signUp },
    conditional: !!signUp,
    deps: [signUp]
  })
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { password, username } = Object.fromEntries(new window.FormData(event.target as any))
    setSingUp({ password, username })
  }
  const newPassword = useRef('')
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    isValidInput(e, REGEX_PASSWORD)
    newPassword.current = e.target.value
  }
  const handleConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = e.target.value
    if (confirmPassword === newPassword.current) {
      e.target.classList.remove('invalid')
      e.target.setCustomValidity('')
    } else {
      e.target.classList.add('invalid')
      e.target.setCustomValidity('Las Contraseñas con coinciden.')
      e.target.reportValidity()
    }
  }
  return (
    <div className='sign'>
      <form onSubmit={onSubmit} className='signForm'>
        <h1>Sign Up</h1>
        <h2>Hola!</h2>
        <h3>Por favor completa los datos, para crear el usuario.</h3>
        <div className='signForm__input inputBox'>
          <input
            required
            className='input'
            type='text'
            name='username'
            placeholder='Usuario'
            minLength={6}
            onChange={isValidInput}
          />
        </div>
        <div className='signForm__input inputBox'>
          <input
            required
            className='input'
            type='password'
            name='password'
            placeholder='Contraseña'
            onChange={handlePassword}
          />
        </div>
        <div className='signForm__input inputBox'>
          <input
            required
            className='input'
            type='password'
            name='confirmPassword'
            placeholder='Contraseña'
            onChange={handleConfirm}
          />
        </div>
        {error !== '' ? <p>{error}</p> : null}
        <button className='button signForm__button' type='submit'>
          Crear Sesión
        </button>
        <span className='signForm__line'></span>
        <div className='signForm__contents'>
          <button
            className='button__withoutBorder signForm__button'
            type='button'
            onClick={() => {
              window.history.back()
            }}>
            volver
          </button>
          <button
            className='button__secondary signForm__button'
            type='button'
            onClick={() => {
              navigate('/signin')
            }}>
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  )
}

export default signUp
