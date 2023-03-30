import { EpisodesConteiner } from './animeInfo__body'
import './index.scss'
import { AnimeInfoHeader } from './animeInfo__header'
import { listPageLinks } from '../../utils/listsPagesLinks'
import { Welcome } from './Welcome'
import { Contribute } from './contribute'
import { useAnimeContext } from '../../../contexts/contextHome'

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
