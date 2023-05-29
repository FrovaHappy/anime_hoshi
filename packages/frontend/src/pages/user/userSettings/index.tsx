import AwaitLoad from '../../../components/AwaitLoad'
import { getUser } from '../utils/getUser'
import './index.styles.scss'
import Info from './Info'
import Notifications from './notifications'

export default function Index() {
  const { error, load, data } = getUser()
  return (
    <>
      <div className="user__optionsContainer">
        <div id="#info" className="user__options">
          {load ? <AwaitLoad /> : <Info data={data} error={error} />}
        </div>
        <Notifications />
      </div>
      <div className="user__nav">
        <a href="#info">Perfil de Usuario</a>
        <a href="#Notifications">Perfil de Usuario</a>
      </div>
    </>
  )
}
