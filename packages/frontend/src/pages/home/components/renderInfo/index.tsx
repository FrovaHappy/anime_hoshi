import { getAnime } from './getAnime'
import { useCallback, useRef, useState } from 'react'
import { useContextAnime } from '../../../contexts/contextHome'
import './index.scss'
import '../../../../styles/popup.scss'
import ShowData from './showData'
import { Contribute } from './contribute'
import Default from './default'

const location = window.location
const id = new window.URLSearchParams(location.search).get('id') ?? null

function Conditionals() {
  const [close, setClose] = useState(false)
  const idRef = useRef(id)
  const { animeMinfied } = useContextAnime()
  const animeId = animeMinfied?.id.toString() ?? idRef.current

  const { load, error, anime } = getAnime(animeId)

  if (error === 'badRequest') return <>badRequest</>
  if (error === 'errorInResult') return <>errorInResult</>
  if (load) return <Default status="loading" />
  if (!anime) return <Default status="default" />
  const closeFuct = () => {
    if (!animeMinfied) setClose(!close)
    if (!animeMinfied) idRef.current = null
  }
  return <ShowData anime={anime} close={closeFuct} />
}
function renderInfo() {
  const { animeMinfied } = useContextAnime()
  const useContribute = useCallback(Contribute, [animeMinfied])

  return (
    <div className="popup popup__inTablet">
      <div className="renderInfo">
        <Conditionals />
        {useContribute()}
      </div>
    </div>
  )
}
export default renderInfo
