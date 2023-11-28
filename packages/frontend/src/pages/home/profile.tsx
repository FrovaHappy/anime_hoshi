import { Link } from 'react-router-dom'
import Icons from '../../Icons'
import { useState } from 'react'
import './profile.scss'

function Profile() {
  const [isVisible, setIsVisible] = useState(false)
  const onClick = () => {
    setIsVisible(!isVisible)
  }
  return (
    <div className='profile'>
      <img className='profile__logo' src='/user.png' alt='user' onClick={onClick} />
      <ul className={isVisible ? 'profile__options' : 'profile__options--hidden'}>
        <li>
          <Link to='setting' className='profile__option'>
            <Icons iconName='IconGear' className='profile__option--icon' />
            Setting
          </Link>
        </li>
        <li>
          <Link to='dashboard' className='profile__option'>
            <Icons iconName='Dashboard' className='profile__option--icon' />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to='signin' className='profile__option'>
            <Icons iconName='Login' className='profile__option--icon' />
            Login
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Profile
