import { Link } from 'react-router-dom'
import Icons from '../../Icons'
export default function Nav() {
  return (
    <nav className='nav'>
      <Link to='/' className='nav__link'>
        <Icons iconName='Back' className='nav__icon' />
      </Link>
      <Link to='' className='nav__link'>
        General
      </Link>
      <Link to='animes' className='nav__link'>
        Editor Anime
      </Link>
      <Link to='scraping' className='nav__link'>
        Scraping
      </Link>
      <Link to='logs' className='nav__link'>
        Logs
      </Link>
    </nav>
  )
}
