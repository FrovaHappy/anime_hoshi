import './index.scss'
import { useAnimesContext } from '../../../contexts/contextHome'
import { urlApi } from '../../../../config'
import { FetchLoading } from './fetchLoading'
import { useFetch } from '../../utils/useFetch'

import TargetAnime from './targetAnime'
const renderList = () => {
  const { loading, error } = useFetch(`${urlApi}/animes`)
  const { animes } = useAnimesContext()
  if (error) return <div>error 😐</div>
  if (loading) return <FetchLoading />
  if (!animes) return <>problem render list</>
  return (
    <>
      <div className="animeList">
        {animes.map((thisAnime) => {
          return <TargetAnime key={thisAnime.dataAnilist.id} thisAnime={thisAnime} />
        })}
      </div>
    </>
  )
}

export default renderList
