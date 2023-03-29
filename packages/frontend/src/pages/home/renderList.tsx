import '../../styles/pages/home/homeList.scss'
import { useAnimesContext } from '../contexts/contextHome'
import { urlApi } from '../../config'
import { FetchLoading } from './components/fetchLoading'
import { useFetch } from './utils/useFetch'

import TargetAnime from './components/targetAnime'
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
