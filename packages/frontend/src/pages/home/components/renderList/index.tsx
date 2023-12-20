import './index.scss'
import { useContextAnimes } from '../../../contexts/contextHome'
import { FetchLoading } from './fetchLoading'
import TargetAnime from './targetAnime'
import useFetch from '../../../../hooks/useFetchNew'
import ErrorComponent from '../../../../components/Error'
import type { AnimeMinified } from '../../../../../../types/Anime'
import { memo, useEffect } from 'react'
import { urlApi } from '../../../../config'

function renderList({ filter }: { filter: AnimeMinified[] | null }) {
  const { animesMinfied, setAnimesMinfied } = useContextAnimes()
  const animes = filter ?? animesMinfied
  const { load, error, contents, errorCode } = useFetch<{ animes: AnimeMinified[] }>({
    query: { url: `${urlApi ?? ''}/animes`, method: 'GET' },
    deps: [],
    conditional: animesMinfied.length === 0,
    enabled: animesMinfied.length === 0
  })

  useEffect(() => {
    if (contents?.animes) setAnimesMinfied(contents?.animes)
  }, [contents?.animes])

  if (load) return <FetchLoading />

  if (error) return <ErrorComponent code={errorCode} message={error} />

  if (!animesMinfied) return <ErrorComponent code={500} message='error no controlado' />

  if (animes?.length === 0) return null

  return (
    <div className='renderList'>
      <div className='renderList__targets'>
        {animes.map(animeMinified => (
          <TargetAnime key={animeMinified.id} thisAnime={animeMinified} />
        ))}
      </div>
    </div>
  )
}

export default memo(renderList)
