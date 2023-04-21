import { AnimeList } from '../../../../../../types'

type Props = {
  anime: AnimeList
}

export function AnimeInfoHeader({ anime }: Props) {
  return (
    <div className="animeInfo">
      <div className="animeInfoHeader__container">
        <div className="animeInfoHeader__container--info">
          <div className="properties">{anime.dataAnilist.episodes} episodios</div>
        </div>
      </div>
    </div>
  )
}
