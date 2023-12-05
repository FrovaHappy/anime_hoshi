import Option from '../../Option'
import { useNavigate } from 'react-router-dom'
import { KeysLocalStorage } from '../../../../enum'
import OptionsPassword from './option.password'

import './EditUser.styles.scss'

interface Props {
  user: {
    newToken: string
    username: string
    roles: string[]
  }
}
export default function EditUser({ user }: Props) {
  const navigate = useNavigate()
  const onHandleChange = () => {
    navigate('/signup')
  }
  const onHandleDelete = () => {
    window.localStorage.removeItem(KeysLocalStorage.token)
    navigate('/signin')
  }
  return (
    <>
      <Option title={`Bienvenido ${user.username}`} description={''} Actions={undefined} />
      <Option
        title={'Cerrar Sesión'}
        description={'Cierra la sesión actual'}
        Actions={
          <button className='button__danger' onClick={onHandleDelete}>
            Cerrar Sesión
          </button>
        }
      />
      <Option
        title={'Cambiar Sesión'}
        description={'Cambia la sesión actual'}
        Actions={
          <button className='button__secondary' onClick={onHandleChange}>
            Cambiar Sesión
          </button>
        }
      />

      <Option
        title={'Actualizar Contraseña'}
        description={'Utiliza minúsculas, mayúsculas, números y símbolos [ #?!@$%^&*- ]'}
        ActionsSecondary={<OptionsPassword />}
        Actions={undefined}
      />
    </>
  )
}
