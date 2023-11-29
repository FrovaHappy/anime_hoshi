import { Link } from 'react-router-dom'
import Icons from '../../Icons'
import { useState } from 'react'
import './profile.scss'
import useFetch from '../../hooks/useFetchNew'
import { KeysLocalStorage } from '../../enum'
import { urlApi } from '../../config'
function SuperUser({ contents }: { contents: any }) {
  if (contents?.roles.some((r: string) => r === 'admin' || r === 'owner' || r === 'viewer')) {
    return (
      <li>
        <Link to='dashboard' className='profile__option'>
          <Icons iconName='Dashboard' className='profile__option--icon' />
          Dashboard
        </Link>
      </li>
    )
  }
  if (!contents) {
    return (
      <li>
        <Link to='signin' className='profile__option'>
          <Icons iconName='Login' className='profile__option--icon' />
          Login
        </Link>
      </li>
    )
  }
}
function Profile() {
  const [isVisible, setIsVisible] = useState(false)
  const token = window.localStorage.getItem(KeysLocalStorage.token) ?? ''
  const { contents, error, load } = useFetch({
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
      </ul>
    </div>
  )
}

export default Profile
