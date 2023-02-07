import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimeList } from '../../../types'
import '../styles/animeList.scss'

interface props {
  animes: AnimeList[]
}
function getlastEpisode(animeList: AnimeList) {
  const keyEpisodesSort =
    Object.keys(animeList?.episodes ?? {})
      .sort((a, b) => parseInt(a) - parseInt(b))
      .at(-1) ?? ''
  const KeyNamePages = Object.keys(animeList?.episodes[keyEpisodesSort]?.pagesUrl ?? {})
  const updateEpisode = animeList?.episodes[keyEpisodesSort]?.updateEpisode!
  const pagesIsPlural = KeyNamePages.length == 1 ? KeyNamePages[0] : `${KeyNamePages.length} paginas`
  return {
    episode: <>Ep. {keyEpisodesSort}</>,
    pages: <>En {pagesIsPlural}</>,
    updateEpisode: updateEpisode,
  }
}

function setColortoElement(index: number, SetIndex: (value: number) => void) {
  SetIndex(index)
}
export function AnimeComponet({ animes }: props) {
  const [index, setindex] = useState(NaN)
  const SetIndex = (index: number) => {
    setindex(index)
  }
  if (animes.length == 0) {
    return <h1>esta cargando</h1>
  }
  return (
    <div className="animeList">
      {animes.map((anime, i) => {
        const styleShadows =
          i === index
            ? { boxShadow: `0px 0px 0.625rem ${anime.dataAnilist.coverImage.color}`, borderRadius: '.3125rem' }
            : undefined
        const styleBackgroundColor = i === index ? { backgroundColor: anime.dataAnilist.coverImage.color } : undefined
        const getEpisodeAndPages = getlastEpisode(anime)
        const renderPoint = Date.now() - getEpisodeAndPages.updateEpisode < 28_800_000 ? { opacity: 1 } : undefined
        return (
          <Link
            key={anime.dataAnilist.id}
            to={`/${anime.dataAnilist.id}`}
            style={styleShadows}
            onClick={() => {
              setColortoElement(i, SetIndex)
            }}
          >
            <div className="targetAnime">
              <p className="targetAnime__pages">{getEpisodeAndPages.pages}</p>
              <div className="targetAnime__img-conteiner" style={styleBackgroundColor}>
                <span className="targetAnime__episode">{getEpisodeAndPages.episode}</span>
                <span className="targetAnime__point" style={renderPoint}></span>
                <img
                  className="targetAnime__img"
                  src={anime.dataAnilist.coverImage.large}
                  alt={anime.dataAnilist.title.romaji}
                />
                <h5 className="targetAnime__title">{anime.dataAnilist.title.romaji}</h5>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
