import { memo, useEffect, useState } from 'react'
import { Description } from './showData'
import ListEpisodes from './showData/EpisodesList'
import Metadata from './showData/Metadata'
import CloseSections from './showData/closeSections'
import useFetch from '../../../../hooks/useFetchNew'
import { urlApi } from '../../../../config'
import type { Anime } from '../../../../../../types/Anime'
import ErrorComponent from '../../../../components/Error'
import { useIdContext } from '../../contextHome'
import './index.scss'
import { Contribute } from './contribute'
import Loading from './Loading'
import Position from './position'
import { getIdLocation } from '../../../../utils/getIdLocation'

export function ShowInfo({ anime }: { anime: Anime }) {
  return (
    <>
      <h3 className='title'>{anime.title.romaji}</h3>
      <Metadata anime={anime} />
      <Description anime={anime} />
      <ListEpisodes anime={anime} />
    </>
  )
}
function Index() {
  const { id, setId } = useIdContext()
  const [positionLeft, setPositionLeft] = useState(false)
  const {
    load,
    error,
    errorCode,
    contents: anime
  } = useFetch<Anime>({
    query: { url: `${urlApi}/animes?id=${id ?? ''}`, method: 'GET' },
    conditional: !!id,
    deps: [id]
  })
  // this observes the back button navigation
  useEffect(() => {
    window.addEventListener('popstate', () => {
      if (getIdLocation() !== id) setId(getIdLocation())
    })
  }, [id])

  const handleClick = () => {
    window.history.pushState(null, '', '/')
    setId(null)
  }

  return (
    <Position hidden={!id} left={positionLeft}>
      <div className='renderInfo'>
        <CloseSections anime={anime} handleClick={handleClick} setPositionLeft={setPositionLeft} />
        {error ? <ErrorComponent code={errorCode} message={error} /> : null}
        {load ? <Loading /> : null}
        {anime && !load && !error ? <ShowInfo anime={anime} /> : null}
        <Contribute />
      </div>
    </Position>
  )
}
export default memo(Index)
