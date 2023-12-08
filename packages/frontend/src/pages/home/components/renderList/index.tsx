import './index.scss'
import { useContextAnimes } from '../../../contexts/contextHome'
import { FetchLoading } from './fetchLoading'
import TargetAnime from './targetAnime'
import useFetch from '../../../../hooks/useFetchNew'
import ErrorComponent from '../../../../components/Error'
import type { AnimeMinified } from '../../../../../../types/Anime'
import { memo, useEffect } from 'react'
import { urlApi } from '../../../../config'
import usePagination from '../../../../hooks/usePagination'
import InfiniteScroll from 'react-infinite-scroll-component'

function renderList({ filter }: { filter: AnimeMinified[] | null }) {
  const { animesMinfied, setAnimesMinfied } = useContextAnimes()
  const animes = filter ?? animesMinfied
  const { data, nextPage, currentPage, pages } = usePagination(animes, 20, 1, true)
  const { load, error, contents, errorCode } = useFetch({
    query: { url: `${urlApi ?? ''}/animes`, method: 'GET' },
    deps: [],
    conditional: animesMinfied.length === 0
  })

  console.log({ data })

  useEffect(() => {
    if (contents?.animes) setAnimesMinfied(contents?.animes)
  }, [contents?.animes])

  if (load) return <FetchLoading />

  if (error) return <ErrorComponent code={errorCode} message={error} />

  if (!animesMinfied) return <ErrorComponent code={500} message='error no controlado' />

  if (data?.length === 0) return null

  return (
    <div className='renderList'>
      <InfiniteScroll
        className='renderList__targets'
        dataLength={data?.length}
        next={nextPage}
        hasMore={currentPage !== pages}
        loader={<h2>Cargando más usuaros...</h2>}>
        {data.map(animeMinified => (
          <TargetAnime key={animeMinified.id} thisAnime={animeMinified} />
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default memo(renderList)
