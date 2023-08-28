import EditUser from './EditUser'
import EmptyUser from './EmptyUser'
import useUser from './useUser'

const title = 'Perfil de Usuario'
const tag = 'user-settings'
function Options() {
  const { contents, error, load } = useUser([])
  if (load) return <>load</>
  if (error === 'token invalid') return <EmptyUser />
  if (!contents) return <EmptyUser />
  return <EditUser user={contents} />
}
export default { title, tag, Options }
