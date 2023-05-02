import './index.scss'
import { Contribute } from './contribute'
import { useAnimeContext } from '../../../contexts/contextHome'
import Info from './Info'
import QueryNotifications from './QueryNotifications'
import { useState } from 'react'
import { KeysLocalStorage } from '../../../../enum'
import { discordWiget } from '../../../../config'

function renderInfo() {
  const { anime, setAnime } = useAnimeContext()
  const hasAccept = !!localStorage.getItem(KeysLocalStorage.notificationProperty)
  const canHideInfo = hasAccept && !anime
  const classRenderInfoDisable = canHideInfo ? 'renderInfo--disabled' : ''
  const [canRenderNotif, setCanRenderNotif] = useState(!hasAccept)
  const renderNotification = canRenderNotif ? (
    QueryNotifications(setCanRenderNotif)
  ) : (
    <>
      <iframe
        className="renderInfo__discord"
        src={discordWiget}
        width="auto"
        height="500"
        frameBorder={0}
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      ></iframe>
    </>
  )
  return (
    <div className={`renderInfo ${classRenderInfoDisable}`}>
      {anime ? Info(anime, setAnime) : renderNotification}
      <Contribute />
    </div>
  )
}
export default renderInfo
