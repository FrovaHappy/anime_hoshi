import { useRef } from 'react'
import type React from 'react'
import { REGEX_PASSWORD } from '../../../../../utils/const'
import { buildFetch } from '../../../../../hooks/useFetchNew'
import { urlApi } from '../../../../../config'
import { KeysLocalStorage } from '../../../../../enum'
import { isValidInput } from '../../../../../utils/general'
export default function OptionsPassword() {
  const newPassword = useRef('')
  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    isValidInput(e, REGEX_PASSWORD)
    newPassword.current = password
  }
  const handleConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = e.target.value
    if (confirmPassword === newPassword.current) {
      e.target.classList.remove('invalid')
      e.target.setCustomValidity('')
    } else {
      e.target.setCustomValidity('Las contraseñas con coinciden.')
      e.target.classList.add('invalid')
      e.target.reportValidity()
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { oldPassword, newPassword } = Object.fromEntries(new FormData(e.currentTarget))
    e.currentTarget.reset()
    const { data } = await buildFetch({
      method: 'PUT',
      url: `${urlApi}/user`,
      authorization: window.localStorage.getItem(KeysLocalStorage.token) ?? '',
      body: {
        oldPassword,
        newPassword
      }
    })
    window.localStorage.setItem(KeysLocalStorage.token, data.newToken)
    // TODO: feedback to user
  }

  return (
    <form onSubmit={handleSubmit} className='userForm' action='updatePassword'>
      <label className='userForm__label'>Contraseña:</label>
      <input
        required
        className='input__password'
        type='password'
        name='oldPassword'
        placeholder='Contraseña Actual'
        onChange={e => {
          isValidInput(e, REGEX_PASSWORD)
        }}
      />
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
      <button className='button userForm__submit' type='submit'>
        Actualizar Contraseña
      </button>
    </form>
  )
}
