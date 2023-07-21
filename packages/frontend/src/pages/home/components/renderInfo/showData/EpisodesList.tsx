import { useState } from 'react'
import { Timestamps } from '../../../../../enum'
import select from '../../../../shared/select'
import { getTimeAgo } from '../../../../../utils/getTimeAgo'
import { type Anime } from '../../../../../../../types/Anime'

function BuilderOptions(anime: Anime) {
  const getNamePages = Object.keys(anime.pages)
  return getNamePages.map((namePage) => {
    const page = anime.pages[namePage]
    const isRecently = Date.now() > page.lastUpdate + Timestamps.eight_hours
    const node = (
      <div className="dd">
        <span className={`option__${isRecently ? 'new' : ''}`}></span>
        {namePage}
      </div>
    )
    return { value: namePage, node }
  })
}
export default function ListEpisodes({ anime }: { anime: Anime }) {
  const options = BuilderOptions(anime)
  const [namePage, setNamePage] = useState('')
  const episodes = anime.pages[namePage]?.episodes ?? []

  return (
    <div className="episodesList">
      {select({ values: options, onSelect: setNamePage })}
      <span className="lastUpdate"> {getTimeAgo(anime.lastUpdate)} </span>
      <ul className="list">
        <li className="list__item list__item--title">{namePage}</li>
        {episodes.map((episode) => {
          const isRecently = Date.now() < episode.lastUpdate + Timestamps.eight_hours
          return (
            <li className="list__item" key={episode.episode}>
              <a className="list__item" href={episode.link}>
                <p className={`list__item--episode${isRecently ? 'New' : ''}`}>{episode.episode}</p>
                <p className="list__item--lastUpdate">{getTimeAgo(episode.lastUpdate)}</p>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
