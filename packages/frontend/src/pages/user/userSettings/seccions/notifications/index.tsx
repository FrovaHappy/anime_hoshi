import Option from '../../Option'
import MaxRemittedSetting from './MaxRemittedSetting'
import SetNotifications from './setNotifications'

const title = 'Notificaciones'
const tag = 'notifications'
function Options() {
  return (
    <>
      <Option
        title="Dar Los Permisos"
        description="Activa o desactiva las notificaciones que te enviamos."
        descriptionAction={undefined}
        actions={<SetNotifications />}
      />
      <Option
        title={'Cantidad de notificaciones por Anime'}
        description={
          'Controla la cantidad de Notificaciones que se envían por anime, este es valido dentro del tiempo de espera.'
        }
        descriptionAction={undefined}
        actions={<MaxRemittedSetting />}
      />
    </>
  )
}
export default { title, tag, Options }
