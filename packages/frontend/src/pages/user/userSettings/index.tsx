import './index.styles.scss'

import notifications from './seccions/notifications'
const settingCollection = [notifications]

export default function Index() {
  return (
    <div className='containerMain'>
      <div className='gridRow1-auto'>
        <div className='userNav'>
          {settingCollection.map(setting => {
            return (
              <a href={`#${setting.tag}`} key={setting.tag}>
                {setting.title}
              </a>
            )
          })}
        </div>
      </div>

      {settingCollection.map(setting => (
        <section key={setting.tag} id={setting.tag} className='sectionContainer'>
          <h3 className='sectionContainer__title'>{setting.title}</h3>
          {setting.Options()}
        </section>
      ))}
    </div>
  )
}
