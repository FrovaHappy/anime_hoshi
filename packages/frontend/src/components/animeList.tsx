import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimeList } from '../../../types'
import '../styles/animeList.scss'

interface props {
  animeList: AnimeList[]
}
function getlastEpisode(animeList: AnimeList) {
  const arrayNumEpisodes = Object.keys(animeList.episodes).sort((a, b) => parseInt(a) - parseInt(b)) ?? []
  const arrayTitleinPages = Object.keys(animeList.titleinPages)
  const updateEpisode = animeList.episodes[arrayNumEpisodes.at(-1) || 0]?.updateEpisode!
  const pagesIsPlural = arrayTitleinPages.length == 1 ? arrayTitleinPages[0] : `${arrayTitleinPages.length} paginas`
  return {
    episode: <>Ep. {arrayNumEpisodes.at(-1)}</>,
    pages: <>En {pagesIsPlural}</>,
    updateEpisode: updateEpisode,
  }
}

function setColortoElement(index: number, SetIndex: (value: number) => void) {
  SetIndex(index)
}
export function AnimeComponet({ animeList }: props) {
  const [index, setindex] = useState(NaN)
  const SetIndex = (index: number) => {
    setindex(index)
  }
  if (animeList.length == 0) {
    return <h1>esta cargando</h1>
  }
  return (
    <div className="animeList">
      {animeList.map((animeEdited, i) => {
        const styleShadows =
          i === index
            ? { boxShadow: `0px 0px 0.625rem ${animeEdited.dataAnilist.coverImage.color}`, borderRadius: '.3125rem' }
            : undefined
        const styleBackgroundColor =
          i === index ? { backgroundColor: animeEdited.dataAnilist.coverImage.color } : undefined
        const getEpisodeAndPages = getlastEpisode(animeEdited)
        const renderPoint = Date.now() - getEpisodeAndPages.updateEpisode < 28_800_000 ? { opacity: 1 } : undefined
        return (
          <Link
            key={animeEdited.dataAnilist.id}
            to={`/${animeEdited.dataAnilist.id}`}
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
                  src={animeEdited.dataAnilist.coverImage.large}
                  alt={animeEdited.dataAnilist.title.romaji}
                />
                <h5 className="targetAnime__title">{animeEdited.dataAnilist.title.romaji}</h5>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
