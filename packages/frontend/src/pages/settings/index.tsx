import './index.scss'
import { Link } from 'react-router-dom'
import Icons from '../../Icons'
import notifications from './sections/notifications'
import users from './sections/users'
const settingCollection = [users, notifications]
function index() {
  return (
    <div className='main'>
      <div className='containerMain'>
        <div className='gridRow1-auto'>
          <div className='userNav'>
            <Link to='/'>
              <Icons iconName='Back' className='icon' />
              Atrás
            </Link>
            {settingCollection.map(setting => {
              return (
                <a href={`#${setting.tag}`} key={setting.tag}>
                  {setting.title}
                </a>
              )
            })}
          </div>
        </div>

        {settingCollection.map(({ MainComponent, tag, title }) => (
          <section key={tag} className='sectionContainer'>
            <span id={tag} className='sectionContainer__anchor' />
            <h3 className='sectionContainer__title'>{title}</h3>
            <MainComponent />
          </section>
        ))}
      </div>
    </div>
  )
}

export default index
