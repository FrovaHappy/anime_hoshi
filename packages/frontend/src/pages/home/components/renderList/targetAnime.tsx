import { getlastEpisodeInfo } from '../../../../utils/getLastEpisodeInfo'
import Icon from '../../../../Icons'
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
  const setOpaqueImg = compareId || !anime ? 'targetAnime__img' : 'targetAnime__img targetAnime__img--opaque'
  const renderPoint = Date.now() - getEpisodeAndPages.updateEpisode < 28_800_000
  return (
    <div
      className="targetAnime"
      onClick={() => {
        setAnime(thisAnime)
        setColorPrimary(color)
      }}
    >
      <div className="targetAnime__episode">
        Ep. {getEpisodeAndPages.keyLastEpisode}
        <Icon iconName="IconNew" style={isVisibly(renderPoint)} className="itemNewEpisodes" />
      </div>
      <img
        className={setOpaqueImg}
        src={thisAnime.dataAnilist.coverImage.large}
        alt={thisAnime.dataAnilist.title.romaji}
        loading="lazy"
      />
      <p className="targetAnime__title">{thisAnime.dataAnilist.title.romaji}</p>
    </div>
  )
}
