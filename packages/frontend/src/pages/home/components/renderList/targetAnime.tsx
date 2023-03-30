import { getlastEpisodeInfo } from '../../../../utils/getLastEpisodeInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { isVisibly } from '../../../../utils/renderCondicional'
import { AnimeList } from '../../../../../../types'
import { setColorPrimary } from '../../../../utils/toogleColorPrimary'
import { useAnimeContext } from '../../../contexts/contextHome'
import './targetAnime.scss'
type Props = {
  thisAnime: AnimeList
}
export default function TargetAnimeConponent({ thisAnime }: Props) {
  const { anime, setAnime } = useAnimeContext()
  const compareId = thisAnime.dataAnilist.id == anime?.dataAnilist.id
  const getEpisodeAndPages = getlastEpisodeInfo(thisAnime)
  const color = thisAnime.dataAnilist.coverImage.color ?? '#fff'
  const setClassTarget = compareId ? 'targetAnime targetAnime--active' : 'targetAnime'
  const setClassEpisode = compareId ? 'targetAnime__episode targetAnime__episode--active' : 'targetAnime__episode'
  const renderPoint = Date.now() - getEpisodeAndPages.updateEpisode < 28_800_000
  return (
    <div
      className={setClassTarget}
      onClick={() => {
        setAnime(thisAnime)
        setColorPrimary(color)
      }}
    >
      <p className={setClassEpisode}>
        {<FontAwesomeIcon icon={faFire} style={isVisibly(renderPoint)} className="itemNewEpisodes" />}Ep.{' '}
        {getEpisodeAndPages.keyLastEpisode}
      </p>
      <img
        className="targetAnime__img"
        src={thisAnime.dataAnilist.coverImage.large}
        alt={thisAnime.dataAnilist.title.romaji}
        loading="lazy"
      />
      <h5 className="targetAnime__title">{thisAnime.dataAnilist.title.romaji}</h5>
    </div>
  )
}
