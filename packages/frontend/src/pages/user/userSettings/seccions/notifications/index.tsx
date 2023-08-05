import Option from '../../Option'
import DelaySetting from './DelaySetting'
import MaxRemittedSetting from './MaxRemittedSetting'
import MinPagesSetting from './MinPagesSetting'
import DefaultSetting from './defaultSetting'
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
        title="Restaurar Configuración"
        description="Devuelve la configuración a su valor por defecto."
        descriptionAction={undefined}
        actions={<DefaultSetting />}
      />
      <Option
        title={'Tiempo de espera de Notificaciones'}
        description={
          'Controla cuanto tiempo tarda en enviar una notificación si no se cumplen las otras configuraciones.'
        }
        descriptionAction={undefined}
        actions={<DelaySetting />}
      />
      <Option
        title={'Cantidad de notificaciones por Anime'}
        description={
          'Controla la cantidad de Notificaciones que se envían por anime, esto es valido dentro de las 8 horas.'
        }
        descriptionAction={undefined}
        actions={<MaxRemittedSetting />}
      />
      <Option
        title={'Cantidad minima de paginas por Notificaciones'}
        description={
          'La cantidad minima de paginas fuerza el envío de la notificación si este cumple la condición, este afecta al tiempo de espera'
        }
        descriptionAction={undefined}
        actions={<MinPagesSetting />}
      />
      <Option
        title={'Esperar por Paginas Especificas'}
        description={'Futura implementación.'}
        descriptionAction={undefined}
        actions={undefined}
      />
      <Option
        title={'Filtrar Por Animes Fav'}
        description={'Futura implementación.'}
        descriptionAction={undefined}
        actions={undefined}
      />
    </>
  )
}
export default { title, tag, Options }
