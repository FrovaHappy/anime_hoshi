import { notificationProperty } from '../../../../../types'
import { KeysLocalStorage } from '../../../../enum'
import notifyMe from '../../../../utils/swSubscribe'
import './QueryNotifications.scss'

function QueryNotifications(renderNotification: (value: boolean) => void) {
  const setNotificationProperty = (hasAccept: boolean) => {
    const notificationProperty: notificationProperty = {
      hasAccept: hasAccept,
      updated: hasAccept ? Date.now() : undefined,
    }
    localStorage.setItem(KeysLocalStorage.notificationProperty, JSON.stringify(notificationProperty))
    hasAccept ? notifyMe() : null
    renderNotification(false)
  }
  return (
    <div className="notification">
      <p className="notification__title">Por favor, dame permisos para mandar notificaciones</p>
      <img className="notification__image" src="./resources/kanna-pay.gif" alt="kanna pay meme" loading="lazy" />
      <p className="notification__body">
        Para poder, recibir las novedades de los episodios recientes que se agregan, te recomendamos que te subscribas.
        (por el momento, recibiras todas las actualizaciones)
      </p>
      <button className="notification__accept" onClick={() => setNotificationProperty(true)}>
        Si Claro!
      </button>
      <button className="notification__deny" onClick={() => setNotificationProperty(false)}>
        ಥ_ಥ No puedo dártelo...
      </button>
    </div>
  )
}

export default QueryNotifications
