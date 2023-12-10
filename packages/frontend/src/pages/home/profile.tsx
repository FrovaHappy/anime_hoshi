import { Link } from 'react-router-dom'
import Icons from '../../Icons'
import type React from 'react'
import { useState, useEffect } from 'react'
import './profile.scss'
import useFetch from '../../hooks/useFetchNew'
import { KeysLocalStorage } from '../../enum'
import { urlApi } from '../../config'
import { toggleTheme } from '../../utils/toggleTheme'

function SuperUser({ contents }: { contents: any }) {
  const [ButtonDashboard, setButtonDashboard] = useState<React.ReactNode>(null)
  const onClick = () => {
    window.localStorage.removeItem(KeysLocalStorage.token)
    window.location.reload()
  }

  useEffect(() => {
    const isAllowedPermission = contents?.roles?.some((r: string) => r === 'admin' || r === 'owner' || r === 'viewer')
    if (isAllowedPermission) {
      setButtonDashboard(
        <li>
          <Link to='dashboard' className='profile__option'>
            <Icons iconName='Dashboard' className='profile__option--icon' />
            Dashboard
          </Link>
        </li>
      )
    }
  }, [contents?.roles])

  if (!contents) {
    return (
      <>
        {ButtonDashboard}
        <li>
          <Link to='signin' className='profile__option'>
            <Icons iconName='Login' className='profile__option--icon' />
            Login
          </Link>
        </li>
      </>
    )
  }

  return (
    <>
      {ButtonDashboard}
      <li className='profile__option' onClick={onClick}>
        <Icons iconName='IconClose' className='profile__option--icon' />
        Cerrar Sesión
      </li>
    </>
  )
}
function Profile() {
  const [isVisible, setIsVisible] = useState(false)
  const token = window.localStorage.getItem(KeysLocalStorage.token) ?? ''
  const { contents, error, load } = useFetch({
    enabled: !!token,
    query: { url: `${urlApi}/user`, method: 'GET', authorization: token },
    deps: []
  })
  const onClick = () => {
    setIsVisible(!isVisible)
  }
  if (contents) {
    window.localStorage.setItem(KeysLocalStorage.token, contents.newToken)
  }
  const renderLogo = () => {
    if (load) return 'profile__logo--loading'
    if (error) return 'profile__logo--error'
    return ''
  }
  const isDarkTheme = window.document.documentElement.getAttribute('data-theme') === 'dark'
  return (
    <div className='profile'>
      <img className={'profile__logo ' + renderLogo()} src='/user.png' alt='user' onClick={onClick} />
      <ul className={isVisible ? 'profile__options' : 'profile__options--hidden'}>
        <li>
          <Link to='setting' className='profile__option'>
            <Icons iconName='IconGear' className='profile__option--icon' />
            Setting
          </Link>
        </li>
        <SuperUser contents={contents} />
        <li className='profile__option'>
          <Icons iconName='DarkMode' className='profile__option--icon' />
          Modo Oscuro
          <label className='switch'>
            <input type='checkbox' onClick={toggleTheme} defaultChecked={isDarkTheme} />
            <span className='slider' />
          </label>
        </li>
      </ul>
    </div>
  )
}

export default Profile
