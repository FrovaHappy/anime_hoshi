import './index.scss'
import { useContextAnimes } from '../../../contexts/contextHome'
import { FetchLoading } from './fetchLoading'
import TargetAnime from './targetAnime'
import useFetch from '../../../../hooks/useFetchNew'
import { urlApi } from '../../../../config'
import ErrorComponent from '../../../../components/Error'
import { useState } from 'react'
import type { AnimeMinified } from '../../../../../../types/Anime'
import type React from 'react'

function renderList() {
  const { animesMinfied, setAnimesMinfied } = useContextAnimes()
  const [filter, setFilter] = useState<AnimeMinified[] | null>(null)
  const { load, error, contents, errorCode } = useFetch({
    query: { url: `${urlApi ?? ''}/animes`, method: 'GET' },
    deps: [],
    conditional: animesMinfied.length === 0
  })
  if (load) return <FetchLoading />
  if (error) return <ErrorComponent code={errorCode} message={error} />
  if (contents) setAnimesMinfied(contents.animes)
  if (!animesMinfied) return <ErrorComponent code={500} message='error no controlado' />
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const search = e.target.value
    if (search.length === 0) {
      setFilter(null)
      return
    }
    const data = animesMinfied.filter(ani => ani.title.toLowerCase().includes(search.toLowerCase()))
    setFilter(data)
  }
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
        <input
          type='text'
          placeholder='Filtra por nombre...'
          className='input renderList__search'
          onChange={handleChange}
        />
        <div className='renderList__targets'>{render()}</div>
      </div>
    </>
  )
}

export default renderList
