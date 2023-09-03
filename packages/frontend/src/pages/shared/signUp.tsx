import type React from 'react'
import { type FormEvent, useEffect, useState, useRef } from 'react'
import { useShowComponent, ComponentType } from '../contexts/Sessions'
import { urlApi } from '../../config'
import useFetch from '../../hooks/useFetch'
import { type ObjectDynamic } from '../../../types'
import { isValidInput } from '../../utils/general'
import { REGEX_PASSWORD } from '../../utils/const'
function signUp() {
  const { setShowComponent } = useShowComponent()
  const [signUp, setSingUp] = useState<ObjectDynamic<FormDataEntryValue> | undefined>(undefined)
  const [error, setError] = useState<string>('')
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { password, username } = Object.fromEntries(new window.FormData(event.target as any))
    setSingUp({ password, username })
  }
  useEffect(() => {
    const initFetch = async () => {
      if (signUp) {
        const response = await useFetch({ url: `${urlApi}/user/signup`, method: 'POST', body: signUp })
        if (response?.code === 201) {
          setShowComponent(ComponentType.signIn)
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
        <h1 className='signForm__title'>sign Up</h1>
        <input
          required
          className='input__password'
          type='text'
          name='username'
          placeholder='Usuario'
          minLength={6}
          onChange={isValidInput}
        />
        <input
          required
          className='input__password'
          type='password'
          name='password'
          placeholder='Contraseña'
          onChange={handlePassword}
        />
        <input
          required
          className='input__password'
          type='password'
          name='confirmPassword'
          placeholder='Contraseña'
          onChange={handleConfirm}
        />
        {error !== '' ? <p>{error}</p> : null}
        <button className='button' type='submit'>
          Crear Sesión
        </button>
        <p>ó</p>
        <div className='signForm__contents'>
          <button
            className='button__secondary'
            type='button'
            onClick={() => {
              setShowComponent(ComponentType.children)
            }}>
            volver
          </button>
          <button
            className='button__secondary'
            type='button'
            onClick={() => {
              setShowComponent(ComponentType.signIn)
            }}>
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  )
}

export default signUp
