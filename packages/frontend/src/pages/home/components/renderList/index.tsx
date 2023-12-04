import './index.scss'
import { useContextAnimes } from '../../../contexts/contextHome'
import { FetchLoading } from './fetchLoading'
import TargetAnime from './targetAnime'
import useFetch from '../../../../hooks/useFetchNew'
import { urlApi } from '../../../../config'
import ErrorComponent from '../../../../components/Error'
import type { AnimeMinified } from '../../../../../../types/Anime'
import { useEffect } from 'react'
function useHandleChangesAnimes(contents: any, deps: any[]) {
  const { setAnimesMinfied } = useContextAnimes()
  useEffect(() => {
    if (contents?.animes) setAnimesMinfied(contents.animes)
  }, deps)
}
function renderList({ filter }: { filter: AnimeMinified[] | null }) {
  const { animesMinfied } = useContextAnimes()
  const { load, error, contents, errorCode } = useFetch({
    query: { url: `${urlApi ?? ''}/animes`, method: 'GET' },
    deps: [],
    conditional: animesMinfied.length === 0
  })
  useHandleChangesAnimes(contents, [contents])
  if (load) return <FetchLoading />
  if (error) return <ErrorComponent code={errorCode} message={error} />

  if (!animesMinfied) return <ErrorComponent code={500} message='error no controlado' />

  const render = () => {
    if (filter) {
      return filter.map(animeMinified => {
        return <TargetAnime key={animeMinified.id} thisAnime={animeMinified} />
      })
    }
    return animesMinfied.map(animeMinified => {
      return <TargetAnime key={animeMinified.id} thisAnime={animeMinified} />
    })
  }
  return (
    <>
      <div className='renderList'>
        <div className='renderList__targets'>{render()}</div>
      </div>
    </>
  )
}

export default renderList
