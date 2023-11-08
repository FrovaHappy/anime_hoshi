import { useEffect, useRef, useState } from 'react'
import Modal from '../../../../components/Modal'
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
const location = window.location
let id = new window.URLSearchParams(location.search).get('id') ?? null
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
export default function Index() {
  const { animeMinfied, setAnimeMinfied } = useContextAnime()
  const [firstReload, setFirstReload] = useState(true)
  const idRef = useRef(id)
  const animeId = animeMinfied?.id.toString() ?? idRef.current
  const {
    load,
    error,
    errorCode,
    contents: anime
  } = useFetch<Anime>({
    query: { url: `${urlApi}/animes?id=${animeId ?? ''}`, method: 'GET' },
    conditional: !!animeId,
    deps: [animeId]
  })
  useEffect(() => {
    id ? setFirstReload(true) : setFirstReload(false)
  }, [])
  const handleClick = () => {
    id = null
    setFirstReload(false)
    setAnimeMinfied(null)
    console.log(id)
  }
  return (
    <Modal hidden={!animeMinfied && !firstReload}>
      <div className='renderInfo'>
        <CloseSections anime={anime} handleClick={handleClick} />
        {error ? <ErrorComponent code={errorCode} message={error} /> : null}
        {load ? <Loading /> : null}
        {anime && !load && !error ? <ShowInfo anime={anime} /> : null}
        <Contribute />
      </div>
    </Modal>
  )
}
