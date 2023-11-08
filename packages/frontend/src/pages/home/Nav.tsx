import { Link } from 'react-router-dom'
import { KeysLocalStorage } from '../../enum'
import Icons from '../../Icons'
import './Nav.scss'
export default function Nav() {
  const token = window.localStorage.getItem(KeysLocalStorage.token)
  return (
    <div className='navHome'>
      <div className='navHome__separe'>
        <Link to='' className='navHome__link'>
          <img src='/windows11/LargeTile.scale-150.png' alt='logo' className='navHome__icon' />
          AnimeHoshi
        </Link>
      </div>
      <Link to='setting' className='navHome__link'>
        <Icons iconName='IconGear' className='navHome__icon' />
        Setting
      </Link>
      {token && (
        <Link to='dashboard' className='navHome__link'>
          <Icons iconName='IconBars' className='navHome__icon' />
          Dashboard
        </Link>
      )}
    </div>
  )
}
