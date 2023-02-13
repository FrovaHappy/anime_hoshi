import { getlastEpisodeInfo } from '../../../utils/getLastEpisodeInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSeedling } from '@fortawesome/free-solid-svg-icons'
import { isVisibly } from '../../../utils/renderCondicional'
import { AnimeList } from '../../../../../types'
type Props = {
  anime: AnimeList
  setId: (value: number) => void
  setShadows: boolean
}
export default function TargetAnimeConponent({ anime, setId, setShadows }: Props) {
  const getEpisodeAndPages = getlastEpisodeInfo(anime)
  const color = anime.dataAnilist.coverImage.color ?? '#fff'
  const styleShadows = setShadows
    ? {
        boxShadow: `0px 0px 0.625rem .125rem ${color}`,
      }
    : undefined
  const renderPoint = Date.now() - getEpisodeAndPages.updateEpisode < 28_800_000
  return (
    <div
      className="targetAnime"
      onClick={() => {
        setId(anime.dataAnilist.id)
      }}
      style={styleShadows}
    >
      <p className="targetAnime__episode">
        {<FontAwesomeIcon icon={faSeedling} style={isVisibly(renderPoint)} className="itemNewEpisodes" />}Ep.{' '}
        {getEpisodeAndPages.keyLastEpisode}
      </p>
      <img className="targetAnime__img" src={anime.dataAnilist.coverImage.large} alt={anime.dataAnilist.title.romaji} />
      <h5 className="targetAnime__title">{anime.dataAnilist.title.romaji}</h5>
    </div>
  )
}
