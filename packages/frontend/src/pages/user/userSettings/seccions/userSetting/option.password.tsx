import { useRef, useState } from 'react'
import type React from 'react'
import { REGEX_PASSWORD } from '../../../../../utils/const'
import { buildFetch } from '../../../../../hooks/useFetchNew'
import { urlApi } from '../../../../../config'
import { KeysLocalStorage } from '../../../../../enum'
export default function OptionsPassword() {
  const [invalid, setInvalid] = useState(false)
  const newPassword = useRef('')
  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    const passwordValid = REGEX_PASSWORD.test(password)
    if (passwordValid) {
      e.target.classList.remove('input__password--invalid')
      console.log(password)
    } else {
      e.target.classList.add('input__password--invalid')
    }
    newPassword.current = password
  }
  const handleConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = e.target.value
    if (confirmPassword === newPassword.current) {
      e.target.classList.remove('input__password--invalid')
      setInvalid(false)
    } else {
      e.target.classList.add('input__password--invalid')
      setInvalid(true)
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { oldPassword, newPassword, confirmPassword } = Object.fromEntries(new FormData(e.currentTarget))
    e.currentTarget.reset()
    const equalPassword = newPassword === confirmPassword
    if (!invalid && equalPassword) {
      const { error, data } = await buildFetch({
        method: 'PUT',
        url: `${urlApi}/user`,
        authorization: window.localStorage.getItem(KeysLocalStorage.token) ?? '',
        body: {
          oldPassword,
          newPassword
        }
      })
      console.log(data, error)
    }
  }
  return (
    <form onSubmit={handleSubmit} className='userForm' action='updatePassword'>
      <label className='userForm__label'>Contraseña:</label>
      <input required className='input__password' type='password' name='oldPassword' placeholder='Contraseña Actual' />
      <label className='userForm__label'>Nueva Contraseña:</label>
      <input
        className='input__password'
        onChange={handleNewPassword}
        required
        type='password'
        name='newPassword'
        placeholder='Contraseña Nueva'
      />

      <label className='userForm__label'>Confirmar Contraseña:</label>
      <input
        required
        onChange={handleConfirm}
        className='input__password'
        type='password'
        name='confirmPassword'
        placeholder='Confirma la Contraseña'
      />
      <label className='userForm__label'>{invalid ? 'no coinciden' : ''}</label>
      <button className='button userForm__submit' type='submit'>
        Actualizar Contraseña
      </button>
    </form>
  )
}
