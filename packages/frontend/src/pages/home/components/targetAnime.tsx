import { getlastEpisodeInfo } from '../../../utils/getLastEpisodeInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { isVisibly } from '../../../utils/renderCondicional'
import { AnimeList } from '../../../../../types'
import { setColorPrimary } from '../../../utils/toogleColorPrimary'
type Props = {
  anime: AnimeList
  setId: (value: number) => void
  id: number
}
export default function TargetAnimeConponent({ anime, setId, id }: Props) {
  const compareId = anime.dataAnilist.id == id
  const getEpisodeAndPages = getlastEpisodeInfo(anime)
  const color = anime.dataAnilist.coverImage.color ?? '#fff'
  const setClassTarget = compareId ? 'targetAnime targetAnime--active' : 'targetAnime'
  const setClassEpisode = compareId ? 'targetAnime__episode targetAnime__episode--active' : 'targetAnime__episode'
  const renderPoint = Date.now() - getEpisodeAndPages.updateEpisode < 28_800_000
  return (
    <div
      className={setClassTarget}
      onClick={() => {
        setId(anime.dataAnilist.id)
        setColorPrimary(color)
      }}
    >
      <p className={setClassEpisode}>
        {<FontAwesomeIcon icon={faFire} style={isVisibly(renderPoint)} className="itemNewEpisodes" />}Ep.{' '}
        {getEpisodeAndPages.keyLastEpisode}
      </p>
      <img
        className="targetAnime__img"
        src={anime.dataAnilist.coverImage.large}
        alt={anime.dataAnilist.title.romaji}
        loading="lazy"
      />
      <h5 className="targetAnime__title">{anime.dataAnilist.title.romaji}</h5>
    </div>
  )
}
