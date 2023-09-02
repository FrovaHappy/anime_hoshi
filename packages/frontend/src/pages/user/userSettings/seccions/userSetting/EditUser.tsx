import { type User } from './useUser'
import Option from '../../Option'
import { ComponentType, useShowComponent } from '../../../../contexts/Sessions'
import { KeysLocalStorage } from '../../../../../enum'
import OptionsPassword from './option.password'

import './EditUser.styles.scss'

interface Props {
  user: User
}
export default function EditUser({ user }: Props) {
  const { setShowComponent } = useShowComponent()
  const onHandleChange = () => {
    setShowComponent(ComponentType.signIn)
  }
  const onHandleDelete = () => {
    window.localStorage.removeItem(KeysLocalStorage.token)
    setShowComponent(ComponentType.signIn)
  }
  return (
    <>
      <Option
        title={`Bienvenido ${user.username}`}
        description={''}
        descriptionAction={undefined}
        actions={undefined}
      />
      <Option
        title={'Cerrar Sesión'}
        description={'Cierra la sesión actual'}
        descriptionAction={undefined}
        actions={
          <button className='button__danger' onClick={onHandleDelete}>
            Cerrar Sesión
          </button>
        }
      />
      <Option
        title={'Cambiar Sesión'}
        description={'Cambia la sesión actual'}
        descriptionAction={undefined}
        actions={
          <button className='button__secondary' onClick={onHandleChange}>
            Cambiar Sesión
          </button>
        }
      />

      <Option
        title={'Actualizar Contraseña'}
        description={'Utiliza minúsculas, mayúsculas, números y símbolos [ #?!@$%^&*- ]'}
        descriptionAction={<OptionsPassword />}
        actions={undefined}
      />
    </>
  )
}
