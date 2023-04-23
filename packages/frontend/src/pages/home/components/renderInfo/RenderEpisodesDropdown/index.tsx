import { useAnimeContext } from '../../../../contexts/contextHome'
import { listPageLinks } from '../../../utils/listsPagesLinks'
import RenderEpisodesLink from './RenderEpisodesLink'
import SelectPage from './SelectPage'

function index() {
  const { anime } = useAnimeContext()

  const list = listPageLinks(anime!)
  const RenderSelectPage = SelectPage({ shortedEpisodesForPages: list, id: anime!.dataAnilist.id })
  const SelectPageComponent = RenderSelectPage.component
  const pageSelected = RenderSelectPage.pageSelected
  return (
    <div>
      {SelectPageComponent}
      <RenderEpisodesLink pageSelected={pageSelected} shortedEpisodesForPages={list} />
    </div>
  )
}

export default index
