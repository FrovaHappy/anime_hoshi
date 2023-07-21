import { getAnime } from './getAnime'
import { useRef, useState } from 'react'
import { useContextAnime } from '../../../contexts/contextHome'
import './index.scss'
import '../../../../styles/popup.scss'
import ShowData from './showData'

const location = window.location
const id = new window.URLSearchParams(location.search).get('id') ?? null

function Conditionals() {
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
  if (!anime) return <>default</>
  return <ShowData anime={anime} close={closeFuct} />
}
function renderInfo() {
  return (
    <div className="popup popup__inTablet">
      <div className="renderInfo">
        <Conditionals />
      </div>
    </div>
  )
}
export default renderInfo
