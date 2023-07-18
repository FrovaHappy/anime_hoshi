import { type Anime } from '../../../../../../../types/Anime'
import { getTimeAgo } from '../../../../../utils/getTimeAgo'
import { useAnimeContext } from '../../../../contexts/contextHome'
import { listPageLinks } from '../../../utils/listsPagesLinks'
import RenderEpisodesLink from './RenderEpisodesLink'
import Items from '../../../../../Icons'
import SelectPage from './SelectPage'
function getlastEpisodeNum(anime: Anime) {
  const { animeMinfied } = useAnimeContext()
}

function index() {
  const { anime } = useAnimeContext()

  const list = listPageLinks(anime!)
  const RenderSelectPage = SelectPage({ shortedEpisodesForPages: list, id: anime!.dataAnilist.id })
  const SelectPageComponent = RenderSelectPage.component
  const pageSelected = RenderSelectPage.pageSelected
  const lastEpisode = getlastEpisodeNum(anime!)
  const lastUpdate = anime!.episodes[lastEpisode]?.updateEpisode
  const timeAgo = !lastUpdate ? '(Fecha Erronea!)' : getTimeAgo(lastUpdate)
  return (
    <>
      <div className="renderInfo__lastUpdate">
        {SelectPageComponent}
        <Items iconName="IconRotate" className="renderInfo__lastUpdate--icon" />
        {timeAgo}
      </div>
      <RenderEpisodesLink pageSelected={pageSelected} shortedEpisodesForPages={list} />
    </>
  )
}

export default index
