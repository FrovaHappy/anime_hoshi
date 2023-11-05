import './index.scss'
import { useContextAnimes } from '../../../contexts/contextHome'
import { FetchLoading } from './fetchLoading'
import TargetAnime from './targetAnime'
import useFetch from '../../../../hooks/useFetchNew'
import { urlApi } from '../../../../config'

function renderList() {
  const { animesMinfied, setAnimesMinfied } = useContextAnimes()
  const { load, error, contents } = useFetch({
    query: { url: `${urlApi ?? ''}/animes`, method: 'GET' },
    deps: [],
    conditional: animesMinfied.length === 0
  })
  if (load) return <FetchLoading />
  if (error) return <div>Error Con la Api 😐{error}</div>
  if (contents) setAnimesMinfied(contents.animes)
  if (!animesMinfied) return <div>Error Inesperado </div>
  return (
    <div className='renderList'>
      <div className='renderList__targets'>
        {animesMinfied.map(animeMinified => {
          return <TargetAnime key={animeMinified.id} thisAnime={animeMinified} />
        })}
      </div>
    </div>
  )
}

export default renderList
