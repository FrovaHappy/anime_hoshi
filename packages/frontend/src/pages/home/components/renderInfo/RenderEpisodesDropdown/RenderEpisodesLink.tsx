import { List } from '../../../../../../types'
import Icons from '../../../../../Icons'
import { getTimeAgo } from '../../../../../utils/getTimeAgo'
import './RenderEpisodesLink.scss'
type Props = {
  pageSelected: string
  shortedEpisodesForPages: List
}
function isNewEpisode(update: number) {
  const difUpdate = Date.now() - update
  const eitghHours = 28_800_000
  return difUpdate <= eitghHours
    ? undefined
    : {
        display: 'none',
      }
}
function RenderEpisodesLink({ pageSelected, shortedEpisodesForPages }: Props) {
  if (pageSelected === 'none') {
    return (
      <div className="episodesLink--empty">
        <p>Ten cuidado! Las paginas piratas pueden contener virus, navega en ellas bajo tu responsabilidad.</p>
      </div>
    )
  }
  return (
    <ul className="episodesLink">
      {shortedEpisodesForPages[pageSelected]?.reverse().map((episodeInfo) => {
        return (
          <li key={episodeInfo.episode} className="episodesLink__item">
            <a href={episodeInfo.url} target="_blank" rel="noreferrer" className="item ">
              <p className="item__text">Episodio {episodeInfo.episode}</p>
              <Icons
                iconName="IconNew"
                className="itemNewEpisodes item__text--newEp"
                style={isNewEpisode(episodeInfo.update)}
              />
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
