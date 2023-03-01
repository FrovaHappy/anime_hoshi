import { useEffect, useState } from 'react'
import { AnimeList } from '../../../../../types'
import { hours } from '../../../enum'
import { List } from '../../../../types'
import { getlastEpisodeInfo } from '../../../utils/getLastEpisodeInfo'
import { getTimeAgo } from '../../../utils/getTimeAgo'
import renderCondicional, { isVisibly } from '../../../utils/renderCondicional'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faRotate, faExternalLink } from '@fortawesome/free-solid-svg-icons'
import RenderListDropdown from './listDropdown'

interface Props {
  list: List
  id: number
  anime: AnimeList
}

function toogleEpisodeOptions(depencies: any[]) {
  const [active, setActive] = useState('default')
  useEffect(() => {
    setActive('default')
  }, depencies)
  return {
    active,
    setActive: (index: string) => setActive(index),
  }
}

function episodeElementComponent(item: { url: string; update: number; episode: number }) {
  const renderPoint = renderCondicional.validInsideOf(hours['8h'], item.update)
  return (
    <li className="conteiner__item" key={item.episode}>
      <a href={item.url} target="_blank" rel="noreferrer" className="item ">
        <FontAwesomeIcon icon={faFire} style={isVisibly(renderPoint)} className="itemNewEpisodes item__text--newEp" />
        <p className="item__text">Episodio {item.episode}</p>
        <p className="item__text--timeAgo">{getTimeAgo(item.update)}</p>
        <FontAwesomeIcon className="item__text--externalLink" icon={faExternalLink} />
      </a>
    </li>
  )
}
export function EpisodesConteiner({ list, id, anime }: Props) {
  const { active, setActive } = toogleEpisodeOptions([id])
  const activeState = { active, setActive }
  const listSortedForNamePage = Object.keys(list)
  const lastEpisodeInfo = getlastEpisodeInfo(anime)
  return (
    <>
      <div className="conteiner">
        <div className="conteiner__select">
          <RenderListDropdown
            updateEpisode={lastEpisodeInfo.updateEpisode}
            keyNamePages={lastEpisodeInfo.KeyNamePages}
            listSortedForNamePage={listSortedForNamePage}
            activeState={activeState}
          />
          <span>
            {<FontAwesomeIcon icon={faRotate} />}
            {getTimeAgo(lastEpisodeInfo.updateEpisode)}
          </span>
        </div>
        {listSortedForNamePage.map((page) => {
          if (page === active) {
            return (
              <ul className="conteiner__list" key={page}>
                {list[page]?.reverse().map(episodeElementComponent)}
              </ul>
            )
          }
        })}
      </div>
    </>
  )
}
