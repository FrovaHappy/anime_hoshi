import { Link } from 'react-router-dom'
import Icons from '../../Icons'
import './index.scss'
const path = '/dashboard'
type Routes = 'general' | 'pages' | 'animes' | 'logs'
interface Props {
  routeActive: Routes
}
export default function Nav({ routeActive }: Props) {
  const isActive = (ra: Routes) => (routeActive === ra ? 'nav__link nav__link--active' : 'nav__link')
  return (
    <nav className='nav'>
      <Link to='/' className='nav__link'>
        <Icons iconName='Back' className='nav__icon' />
      </Link>
      <Link to={`${path}/`} className={isActive('general')}>
        General
      </Link>
      <Link to={`${path}/animes`} className={isActive('animes')}>
        Editor Anime
      </Link>
      <Link to={`${path}/pages`} className={isActive('pages')}>
        Scraping
      </Link>
      <Link to={`${path}/logs`} className={isActive('logs')}>
        Logs
      </Link>
    </nav>
  )
}
