import { useRef, useState } from 'react'
import type React from 'react'
import { REGEX_PASSWORD } from '../../../../../utils/const'
import useFetch from '../../../../../hooks/useFetchNew'
import { urlApi } from '../../../../../config'
import { KeysLocalStorage } from '../../../../../enum'
import { isValidInput } from '../../../../../utils/general'
export default function OptionsPassword() {
  const newPassword = useRef('')
  const [data, setData] = useState<object | undefined>(undefined)
  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    isValidInput(e, REGEX_PASSWORD)
    newPassword.current = password
  }
  const { error, load, contents } = useFetch({
    query: {
      method: 'PUT',
      url: `${urlApi}/user`,
      authorization: window.localStorage.getItem(KeysLocalStorage.token) ?? '',
      body: data
    },
    deps: [data],
    conditional: !!data
  })
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
    setData({ oldPassword, newPassword })
    if (contents) window.localStorage.setItem(KeysLocalStorage.token, contents.newToken)
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
      {load ?? <>loading...</>}
      {error ? <>error: {error} </> : <>update</>}
    </form>
  )
}
