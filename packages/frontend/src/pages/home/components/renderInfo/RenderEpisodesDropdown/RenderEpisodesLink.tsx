import { List } from '../../../../../../types'
import Icons from '../../../../../Icons'
import { getTimeAgo } from '../../../../../utils/getTimeAgo'

type Props = {
  pageSelected: string
  shortedEpisodesForPages: List
}
function RenderEpisodesLink({ pageSelected, shortedEpisodesForPages }: Props) {
  if (pageSelected === 'none') {
    return <p>ten cuidado las paginas piratas pueden contener virus, navega en ellas bajo tu responsabilidad.</p>
  }
  return (
    <ul>
      {shortedEpisodesForPages[pageSelected]?.reverse().map((episodeInfo) => {
        return (
          <li key={episodeInfo.episode}>
            <a href={episodeInfo.url} target="_blank" rel="noreferrer" className="item ">
              <Icons iconName="IconNew" className="itemNewEpisodes item__text--newEp" />
              <p className="item__text">Episodio {episodeInfo.episode}</p>
              <p className="item__text--timeAgo">{getTimeAgo(episodeInfo.update)}</p>
              <Icons iconName="IconExternalLink" className="item__text--externalLink" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default RenderEpisodesLink
