import { type User } from './useUser'

interface Props {
  user: User
}
export default function EditUser({ user }: Props) {
  return (
    <>
      <form action='updatePassword'>
        <p>{user.username}</p>
        <input type='password' name='newPassword' />
        <input type='password' name='confirmPassword' />
        <input type='password' name='oldPassword' />
        <button type='submit'>Actualizar Contraseña</button>
      </form>
    </>
  )
}
