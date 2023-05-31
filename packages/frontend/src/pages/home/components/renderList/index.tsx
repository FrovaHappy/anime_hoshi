import './index.scss'
import { useAnimesContext } from '../../../contexts/contextHome'
import { FetchLoading } from './fetchLoading'
import TargetAnime from './targetAnime'
import { getAnimes } from './getAnimes'

const renderList = () => {
  const { load, error } = getAnimes()
  const { animes } = useAnimesContext()
  if (load) return <FetchLoading />
  if (error === 'badRequest') return <div>Error Con la Api 😐</div>
  if (error === 'cacheEmpty') return <div>Espera mientras se inicia el servidor</div>
  if (!animes) return <div>Error Inesperado </div>
  return (
    <div className="renderList">
      <p className="renderList__title">Animes En Emisión</p>
      <div className="renderList__targets">
        {animes.map((thisAnime) => {
          return <TargetAnime key={thisAnime.dataAnilist.id} thisAnime={thisAnime} />
        })}
      </div>
    </div>
  )
}

export default renderList
