import AwaitLoad from '../../../../components/AwaitLoad'
import { urlApi } from '../../../../config'
import { KeysLocalStorage } from '../../../../enum'
import useFetch from '../../../../hooks/useFetchNew'
import EditUser from './EditUser'
import EmptyUser from './EmptyUser'

const title = 'Perfil de Usuario'
const tag = 'user-settings'
function Options() {
  const token = window.localStorage.getItem(KeysLocalStorage.token)
  const { contents, error, load } = useFetch({
    enabled: !!token,
    query: { url: `${urlApi}/user`, method: 'GET', authorization: token ?? '' },
    deps: []
  })
  if (load) return <AwaitLoad />
  if (error === 'token invalid') return <EmptyUser />
  if (error === 'error fetch') return <>error fetch user</>
  if (!contents) return <EmptyUser />
  return <EditUser user={contents} />
}
export default { title, tag, MainComponent: Options }
