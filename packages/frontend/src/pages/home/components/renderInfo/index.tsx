import './index.scss'
import { Contribute } from './contribute'
import { useAnimeContext } from '../../../contexts/contextHome'
import Info from './Info'
import QueryNotifications from './QueryNotifications'
import { useState } from 'react'
import { KeysLocalStorage } from '../../../../enum'

function renderInfo() {
  const { anime, setAnime } = useAnimeContext()
  const hasAccept = !!localStorage.getItem(KeysLocalStorage.notificationProperty)
  const canHideInfo = hasAccept && !anime
  const classRenderInfoDisable = canHideInfo ? 'renderInfo--disabled' : ''
  const [canRenderNotif, setCanRenderNotif] = useState(!hasAccept)
  const renderNotification = canRenderNotif ? QueryNotifications(setCanRenderNotif) : <>default</>
  return (
    <div className={`renderInfo ${classRenderInfoDisable}`}>
      {anime ? Info(anime, setAnime) : renderNotification}
      <Contribute />
    </div>
  )
}
export default renderInfo
