import { AnimeList } from '../../../../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLink } from '@fortawesome/free-solid-svg-icons'

type Props = {
  anime: AnimeList
  color: string
}
export function AnimeInfoHeader({ anime, color }: Props) {
  return (
    <div className="animeInfoHeader">
      <img
        className="animeInfoHeader__img"
        src={anime.dataAnilist.coverImage.large}
        alt={anime.dataAnilist.title.romaji}
      />

      <div className="animeInfoHeader__container">
        <h3 className="animeInfoHeader__container--title" style={{ color: color }}>
          {anime.dataAnilist.title.romaji}
          <a
            className="anilist"
            href={`https://anilist.co/anime/${anime.dataAnilist.id}`}
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon className="anilist__externalLink" icon={faExternalLink} />
            <img className="anilist__img" src="/pages_icons/anilist.svg" alt="anilist icons" />
          </a>
        </h3>
        <div className="animeInfoHeader__container--info">
          <div className="properties">{anime.dataAnilist.episodes} episodios</div>
        </div>
      </div>
    </div>
  )
}
