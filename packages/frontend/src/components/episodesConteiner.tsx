import { useEffect, useState } from 'react'
import { AnimeList } from '../../../types'
import { List } from '../../types'
import { getlastEpisodeInfo } from '../utils/getLastEpisodeInfo'
import { getTimeAgo } from '../utils/getTimeAgo'
interface Props {
  list: List
  color: string
  anime: AnimeList
}
function switchActive(index: number, mySetActive: (value: number) => void) {
  mySetActive(index)
}
export function EpisodesConteiner({ list, color, anime }: Props) {
  useEffect(() => {
    setActive(0)
  }, [color])

  const [active, setActive] = useState(0)
  const mySetActive = (value: number) => {
    setActive(value)
  }
  const listNamePage = Object.keys(list)
  return (
    <div className="episodes_conteiner">
      <span>{getTimeAgo(getlastEpisodeInfo(anime).updateEpisode)}</span>
      <div className="tab">
        {listNamePage.map((page, index) => {
          const isActiveColor =
            index === active
              ? {
                  borderBottom: `solid .0625rem ${color}`,
                }
              : undefined
          return (
            <button
              className="tab__button"
              key={page}
              onClick={() => switchActive(index, mySetActive)}
              style={isActiveColor}
            >
              <b>{page}</b>
            </button>
          )
        })}
      </div>
      <div className="conteiner">
        {listNamePage.map((page, index) => {
          if (index === active) {
            return (
              <ul className="conteiner__list" key={page}>
                {list[page]?.reverse().map((item) => {
                  const renderPoint = Date.now() - item.update < 28_800_000 ? { opacity: 1 } : undefined
                  return (
                    <li className="conteiner__item" key={item.episode}>
                      <a href={item.url} target="_blank" rel="noreferrer" className="item">
                        <p className="item__text">
                          <span className="item__point" style={renderPoint}></span>
                          <b>Episodio {item.episode}</b>
                        </p>
                      </a>
                    </li>
                  )
                })}
              </ul>
            )
          }
        })}
      </div>
    </div>
  )
}
