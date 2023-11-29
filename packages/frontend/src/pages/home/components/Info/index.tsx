import { useEffect, useState } from 'react'
import { Description } from './showData'
import ListEpisodes from './showData/EpisodesList'
import Metadata from './showData/Metadata'
import CloseSections from './showData/closeSections'
import useFetch from '../../../../hooks/useFetchNew'
import { urlApi } from '../../../../config'
import type { Anime } from '../../../../../../types/Anime'
import ErrorComponent from '../../../../components/Error'
import { useContextAnime } from '../../../contexts/contextHome'
import './index.scss'
import { Contribute } from './contribute'
import Loading from './Loading'
import Position from './position'

export function ShowInfo({ anime }: { anime: Anime }) {
  return (
    <>
      <h3 className='title'>{anime.dataAnilist.title.romaji}</h3>
      <Metadata anime={anime} />
      <Description anime={anime} />
      <ListEpisodes anime={anime} />
    </>
  )
}
const location = () => new window.URLSearchParams(window.location.search).get('id') ?? null
export default function Index() {
  const { animeMinfied, setAnimeMinfied } = useContextAnime()
  const [positionLeft, setPositionLeft] = useState(false)
  const [id, setId] = useState(location())
  const {
    load,
    error,
    errorCode,
    contents: anime
  } = useFetch<Anime>({
    query: { url: `${urlApi}/animes?id=${id ?? ''}`, method: 'GET' },
    conditional: !!id,
    deps: [id, animeMinfied]
  })
  useEffect(() => {
    window.addEventListener('popstate', () => {
      if (location() === id) return
      if (location() !== null) {
        setId(location())
        return
      }
      setId(null)
      setAnimeMinfied(null)
    })
  }, [])
  useEffect(() => {
    setId(animeMinfied?.id.toString() ?? location())
  }, [id, animeMinfied])
  const handleClick = () => {
    window.history.pushState(null, '', '/')
    setId(null)
    setAnimeMinfied(null)
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
