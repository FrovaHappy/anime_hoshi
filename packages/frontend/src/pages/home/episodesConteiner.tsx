import React, { useEffect, useState } from 'react'
import { AnimeList } from '../../../../types'
import { hours } from '../../enum'
import { List } from '../../../types'
import { getlastEpisodeInfo } from '../../utils/getLastEpisodeInfo'
import { getTimeAgo } from '../../utils/getTimeAgo'
import renderCondicional, { isVisibly } from '../../utils/renderCondicional'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSeedling, faCaretDown, faRotate } from '@fortawesome/free-solid-svg-icons'

interface Props {
  list: List
  color: string
  anime: AnimeList
}
type RenderListDropdownType = {
  keyNamePages: string[]
  updateEpisode: number
  listSortedForNamePage: string[]
  activeState: { active: string; setActive: (value: string) => void }
}
function toogleEpisodeSelector(depencies: any[]) {
  const defaultElement = <span className="episodes__option--namePage">Elige una opción</span>
  const [episodeSelect, setEpisodeSelect] = useState<React.ReactElement>(defaultElement)
  useEffect(() => {
    setEpisodeSelect(defaultElement)
  }, depencies)
  return {
    episodeSelect,
    setEpisodeSelect: (element: React.ReactElement) => setEpisodeSelect(element),
  }
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
function RenderListDropdown({
  keyNamePages,
  updateEpisode,
  listSortedForNamePage,
  activeState,
}: RenderListDropdownType) {
  const { episodeSelect, setEpisodeSelect } = toogleEpisodeSelector([updateEpisode])
  const [showOptions, setShowOptions] = useState(false)
  return (
    <>
      <div className="episodes episodes__select" onClick={() => setShowOptions(!showOptions)}>
        {episodeSelect}
        <FontAwesomeIcon icon={faCaretDown} />
        <div className="episodes__options" style={isVisibly(showOptions)}>
          {listSortedForNamePage.map((keyNamePage, i) => {
            const renderPoint =
              keyNamePages.some((v) => v == keyNamePage) && renderCondicional.validInsideOf(hours['8h'], updateEpisode)
            const internalComponent = (
              <>
                <FontAwesomeIcon
                  icon={faSeedling}
                  style={isVisibly(renderPoint)}
                  className="itemNewEpisodes episodes__option--newEp"
                />
                <span style={isVisibly(showOptions)}> </span>
                <span className="episodes__option--namePage">{keyNamePage}</span>
              </>
            )
            return (
              <div
                className="episodes__option"
                onClick={() => {
                  setEpisodeSelect(internalComponent)
                  activeState.setActive(keyNamePage)
                }}
                key={i}
              >
                {internalComponent}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
function episodeElementComponent(item: { url: string; update: number; episode: number }) {
  const renderPoint = renderCondicional.validInsideOf(hours['8h'], item.update)
  return (
    <li className="conteiner__item" key={item.episode}>
      <a href={item.url} target="_blank" rel="noreferrer" className="item">
        <p className="item__text">
          <FontAwesomeIcon icon={faSeedling} style={isVisibly(renderPoint)} className="itemNewEpisodes item__newEp" />
          Episodio {item.episode}
        </p>
      </a>
    </li>
  )
}
export function EpisodesConteiner({ list, color, anime }: Props) {
  const { active, setActive } = toogleEpisodeOptions([color])
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
            {<FontAwesomeIcon icon={faRotate} />} {getTimeAgo(lastEpisodeInfo.updateEpisode)}
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
