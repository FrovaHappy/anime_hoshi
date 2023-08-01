import Option from '../../Option'
import SetNotifications from './setNotifications'

const title = 'Notificaciones'
const tag = 'notifications'
function Options() {
  return (
    <Option
      title="Dar Los Permisos"
      description="Activa o desactiva las notificaciones que te enviamos."
      descriptionAction={undefined}
      actions={<SetNotifications />}
    />
  )
}
export default { title, tag, Options }
