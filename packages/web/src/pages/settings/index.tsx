import './index.scss'
import { Link } from 'react-router-dom'
import Icons from '../../Icons'
import notifications from './sections/notifications'
import users from './sections/users'
import type React from 'react'
import { useState } from 'react'
const settingCollection = [users, notifications]
function index() {
  const [titleSelect, SetTitleSelect] = useState(settingCollection[0].title)
  const handleOption = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const href = e.currentTarget.href
    const anchor = e.currentTarget.textContent
    SetTitleSelect(anchor ?? titleSelect)
    window.history.pushState(null, '', href)
  }
  return (
    <div className='setting'>
      <div className='settingNav'>
        <Link to='/'>
          <Icons iconName='Back' className='settingNav__backButton' />
        </Link>
        <div className='settingNav__select' tabIndex={0}>
          <p>{titleSelect}</p> <Icons iconName='IconCaretUp' />
          <div className='settingNav__options'>
            {settingCollection.map(setting => {
              return (
                <a href={`#${setting.tag}`} key={setting.tag} onMouseDown={handleOption}>
                  {setting.title}
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {settingCollection.map(({ MainComponent, tag, title }) => (
        <section key={tag} className='setting__contentOptions'>
          <span id={tag} className='setting__contentOptions--anchor' />
          <h3 className='setting__contentOptions--title'>{title}</h3>
          <MainComponent />
        </section>
      ))}
    </div>
  )
}

export default index
