import { getAnime } from './getAnime'
import { useCallback, useRef, useState } from 'react'
import { useContextAnime } from '../../../contexts/contextHome'
import './index.scss'
import ShowData from './showData'
import { Contribute } from './contribute'
import Default from './default'
import { useShowChildren } from '../../../contexts/Menu'

const location = window.location
const id = new window.URLSearchParams(location.search).get('id') ?? null

function Conditionals() {
  const { setShowMenu } = useShowChildren()
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
    setShowMenu(false)
    if (!animeMinfied) setClose(!close)
    if (!animeMinfied) idRef.current = null
  }
  return <ShowData anime={anime} close={closeFuct} />
}
function renderInfo() {
  const { showMenu } = useShowChildren()
  const { animeMinfied } = useContextAnime()
  const useContribute = useCallback(Contribute, [animeMinfied])
  const hiddenMenu = showMenu ? '' : 'renderInfo--hidden'
  return (
    <div className={`renderInfo ${hiddenMenu}`}>
      <Conditionals />
      {useContribute()}
    </div>
  )
}
export default renderInfo
