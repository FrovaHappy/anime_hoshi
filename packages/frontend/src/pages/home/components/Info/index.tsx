import { useRef } from 'react'
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
const id = new window.URLSearchParams(location.search).get('id') ?? null
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
  const { animeMinfied } = useContextAnime()
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
  return (
    <Modal hidden={!animeMinfied}>
      <div className='renderInfo'>
        <CloseSections anime={anime} />
        {error ? <ErrorComponent code={errorCode} message={error} /> : null}
        {load ? <Loading /> : null}
        {anime && !load && !error ? <ShowInfo anime={anime} /> : null}
        <Contribute />
      </div>
    </Modal>
  )
}
