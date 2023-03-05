import { AnimeList } from '../../../../types'
import { urlApi } from '../../config'
import { AnimeComponet } from './animeList'
import { FetchLoading } from './components/fetchLoading'
import { useFetch } from './utils/useFetch'

export default function Home() {
  const { data, loading, error } = useFetch(`${urlApi}/animes`)
  const animes: AnimeList[] = data
  if (error) return <div>error 😐</div>
  if (loading) return <FetchLoading />

  return <AnimeComponet animes={animes} />
}
