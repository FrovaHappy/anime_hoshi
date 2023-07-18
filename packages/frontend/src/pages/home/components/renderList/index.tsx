import './index.scss'
import { useContextAnimes } from '../../../contexts/contextHome'
import { FetchLoading } from './fetchLoading'
import TargetAnime from './targetAnime'
import { getAnimes } from './getAnimes'

function renderList() {
  const { load, error } = getAnimes()
  const { animesMinfied } = useContextAnimes()
  if (load) return <FetchLoading />
  if (error === 'badRequest') return <div>Error Con la Api 😐</div>
  if (!animesMinfied) return <div>Error Inesperado </div>
  return (
    <div className="renderList">
      <div className="renderList__targets">
        {animesMinfied.map((animeMinified) => {
          return <TargetAnime key={animeMinified.id} thisAnime={animeMinified} />
        })}
      </div>
    </div>
  )
}

export default renderList
