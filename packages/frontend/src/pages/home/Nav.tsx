import { Link } from 'react-router-dom'
import type React from 'react'
import Icons from '../../Icons'
import './Nav.scss'
import { useContextAnimes } from '../contexts/contextHome'
import Profile from './profile'
import { memo } from 'react'

function Nav({ setFilter }: { setFilter: (k: any) => void }) {
  const { animesMinfied } = useContextAnimes()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const search = e.target.value
    if (search.length === 0) {
      setFilter(null)
      return
    }
    const data = animesMinfied.filter(ani => ani.title.toLowerCase().includes(search.toLowerCase()))
    setFilter(data)
  }
  return (
    <nav className='navHome'>
      <div className='navHome__limit'>
        <Link to='' className='navHome__link'>
          <img src='/logo/192.webp' alt='logo' className='navHome__logo' />
        </Link>

        <div className='navHome__search'>
          <Icons iconName={'Search'} />
          <input type='text' placeholder='Filtra por nombre...' onChange={handleChange} />
        </div>
        <Profile />
      </div>
    </nav>
  )
}

export default memo(Nav)
