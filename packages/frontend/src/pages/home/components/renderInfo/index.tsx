import { getAnime } from './getAnime'
import { useRef, useState } from 'react'
import { useContextAnime } from '../../../contexts/contextHome'
import './index.scss'
import Info from './Info'

const location = window.location
const id = new window.URLSearchParams(location.search).get('id') ?? null

function renderInfo() {
  const [close, setClose] = useState(false)
  const idRef = useRef(id)
  const { animeMinfied } = useContextAnime()
  const animeId = animeMinfied?.id.toString() ?? idRef.current

  const { load, error, anime } = getAnime(animeId)
  console.log({ idRef, close, animeMinfied, error, load })

  if (error === 'badRequest') return <>badRequest</>
  if (error === 'errorInResult') return <>errorInResult</>
  if (load) return <>load</>
  const closeFuct = () => {
    if (!animeMinfied) setClose(!close)
    if (!animeMinfied) idRef.current = null
  }
  return <div className="">{anime ? <Info anime={anime} close={closeFuct} /> : <> default </>}</div>
}
export default renderInfo
