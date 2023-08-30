import { ComponentType, useShowComponent } from '../../../../contexts/Sessions'
import Option from '../../Option'
export default function EmptyUser() {
  const { setShowComponent } = useShowComponent()
  const onHandleSignIn = () => {
    setShowComponent(ComponentType.signIn)
  }
  const onHandleSignUp = () => {
    setShowComponent(ComponentType.signUp)
  }
  return (
    <Option
      title='Iniciar Sesión en la Nube'
      description='Inicia sesión o créase una cuenta para  obtener un backup  y acceder a las herramientas de administrador'
      descriptionAction
      actions={
        <>
          <button className='button__secondary' onClick={onHandleSignIn}>
            signIn
          </button>
          <button onClick={onHandleSignUp} className='button'>
            signUp
          </button>
        </>
      }
    />
  )
}
