import { EpisodesConteiner } from './components/animeInfo__body'
import '../../styles/pages/home/homeInfo.scss'
import { AnimeInfoHeader } from './components/animeInfo__header'
import { listPageLinks } from './utils/listsPagesLinks'
import { Welcome } from './components/Welcome'
import { Contribute } from './components/contribute'
import { useAnimeContext } from '../contexts/contextHome'

function renderInfo() {
  const { anime } = useAnimeContext()
  if (!anime) return <Welcome />
  const list = listPageLinks(anime)
  return (
    <div className="anime-info">
      <AnimeInfoHeader anime={anime} />
      <EpisodesConteiner list={list} />
      <Contribute />
    </div>
  )
}
export default renderInfo
