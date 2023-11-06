import { Link } from 'react-router-dom'
import Icons from '../../Icons'
import './Nav.scss'
const path = '/dashboard'
export default function Nav() {
  return (
    <nav className='nav'>
      <Link to='/' className='nav__link'>
        <Icons iconName='Back' className='nav__icon' />
      </Link>
      <Link to={`${path}/`} className='nav__link'>
        General
      </Link>
      <Link to={`${path}/animes`} className='nav__link'>
        Editor Anime
      </Link>
      <Link to={`${path}/pages`} className='nav__link'>
        Scraping
      </Link>
      <Link to={`${path}/logs`} className='nav__link'>
        Logs
      </Link>
    </nav>
  )
}
