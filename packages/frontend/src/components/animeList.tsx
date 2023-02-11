import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimeList } from '../../../types'
import '../styles/animeList.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSeedling } from '@fortawesome/free-solid-svg-icons'
import { getlastEpisodeInfo } from '../utils/getLastEpisodeInfo'
import { isVisibly } from '../utils/renderCondicional'

interface props {
  animes: AnimeList[]
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
        const getEpisodeAndPages = getlastEpisodeInfo(anime)
        const color = anime.dataAnilist.coverImage.color ?? '#fff'
        const styleShadows =
          i === index
            ? {
                boxShadow: `0px 0px 0.625rem .125rem ${color}`,
              }
            : undefined
        const renderPoint = Date.now() - getEpisodeAndPages.updateEpisode < 28_800_000
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
              <p className="targetAnime__episode">
                {<FontAwesomeIcon icon={faSeedling} style={isVisibly(renderPoint)} className="itemNewEpisodes" />}Ep.{' '}
                {getEpisodeAndPages.keyLastEpisode}
              </p>
              <img
                className="targetAnime__img"
                src={anime.dataAnilist.coverImage.large}
                alt={anime.dataAnilist.title.romaji}
              />
              <h5 className="targetAnime__title">{anime.dataAnilist.title.romaji}</h5>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
