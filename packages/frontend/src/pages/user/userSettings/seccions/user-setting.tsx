const title = 'Perfil de Usuario'
const tag = 'user-settings'
function Options() {
  return (
    <>
      <form action="updatePassword">
        <input type="password" name="newPassword" id="newPassword" />
        <input type="password" name="confirmPassword" id="confirmPassword" />
        <input type="password" name="oldPassword" id="oldPassword" />
        <button type="submit">Actualizar Contraseña</button>
      </form>
    </>
  )
}
export default { title, tag, Options }
