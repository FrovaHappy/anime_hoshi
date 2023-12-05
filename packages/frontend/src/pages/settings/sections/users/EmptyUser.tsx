import { useNavigate } from 'react-router-dom'
import Option from '../../Option'
export default function EmptyUser() {
  const navigate = useNavigate()
  const onHandleSignIn = () => {
    navigate('/signin')
  }
  const onHandleSignUp = () => {
    navigate('/signup')
  }
  return (
    <Option
      title='Iniciar Sesión en la Nube'
      description='Inicia sesión o créase una cuenta para  obtener un backup  y acceder a las herramientas de administrador'
      Actions={
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
