import { notificationProperty } from '../../../../types'
import { KeysLocalStorage } from '../../../enum'
import Options from './Options'
import subcribe, { unsubscribe } from '../../../utils/swSubscribe'
import { useState } from 'react'

function notifications() {
  const [load, setLoad] = useState(false)
  const RenderAskPermissions = () => {
    const notificationProperty: notificationProperty = JSON.parse(
      window.localStorage.getItem(KeysLocalStorage.notificationProperty) ?? '{}'
    )
    if (notificationProperty?.hasAccept)
      return (
        <button
          className="button__red"
          onClick={() => {
            setLoad(true)
            unsubscribe().then(() => {
              setLoad(false)
              localStorage.removeItem(KeysLocalStorage.notificationProperty)
            })
          }}
        >
          {load ? <p>. . . </p> : <p>Darse de Baja</p>}
        </button>
      )
    return (
      <button
        className="button__blue"
        onClick={() => {
          setLoad(true)
          subcribe().then(() => {
            const notificationProperty: notificationProperty = {
              hasAccept: true,
              updated: Date.now(),
            }
            localStorage.setItem(KeysLocalStorage.notificationProperty, JSON.stringify(notificationProperty))
            setLoad(false)
          })
        }}
      >
        {load ? <p>. . . </p> : <p>Suscribirse</p>}
      </button>
    )
  }
  return (
    <div className="user__options">
      <h3 className="user__title">Notificaciones</h3>
      <Options
        title="Dar Los Permisos"
        description="Activa o desactiva las notificaciones que te enviamos."
        descriptionAction={undefined}
        actions={<RenderAskPermissions />}
      />
    </div>
  )
}

export default notifications
