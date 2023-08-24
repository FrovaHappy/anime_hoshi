import AwaitLoad from '../../../components/AwaitLoad'
import { getUser } from '../utils/getUser'
import './index.styles.scss'
import Info from './Info'

import notifications from './seccions/notifications'
const settingCollection = [notifications]

export default function Index() {
  const { error, load, data } = getUser()
  return (
    <>
      <div className='user__nav'>
        {settingCollection.map(setting => {
          return (
            <a href={`#${setting.tag}`} key={setting.tag}>
              {setting.title}
            </a>
          )
        })}
      </div>
      <div className='user__options'>
        <div id='#info' className='user__options'>
          {load ? <AwaitLoad /> : <Info data={data} error={error} />}
        </div>
        {settingCollection.map(setting => (
          <div key={setting.tag} id={setting.tag} className='optionsContainer'>
            <h3 className='optionsContainer__title'>{setting.title}</h3>
            {setting.Options()}
          </div>
        ))}
      </div>
    </>
  )
}
