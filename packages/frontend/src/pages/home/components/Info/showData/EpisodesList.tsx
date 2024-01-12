import { useState } from 'react'
import { Timestamps } from '../../../../../enum'
import select from '../../../../../components/select'
import { getTimeAgo } from '../../../../../utils/getTimeAgo'
import { type Anime } from '../../../../../../../types/Anime'
import { mayorLastUpdate, toPascalCase } from '../../../../../utils/general'
import Icons from '../../../../../Icons'

function BuilderOptions(anime: Anime) {
  const getNamePages = Object.keys(anime.pages)
  return getNamePages.map((namePage) => {
    const page = anime.pages[namePage]
    const isRecently = Date.now() < page.lastUpdate + Timestamps.eight_hours
    const node = <div className={`option ${isRecently ? 'option__new' : ''}`}>{toPascalCase(namePage)}</div>
    return { value: namePage, node }
  })
}
export default function ListEpisodes({ anime }: { anime: Anime }) {
  const options = BuilderOptions(anime)
  const [namePage, setNamePage] = useState('')
  const episodes = anime.pages[namePage]?.episodes ?? []

  return (
    <>
      <div className='episodesList'>
        {select({ values: options, onSelect: setNamePage })}
        <span className='episodesList__lastUpdate'>
          <Icons iconName='IconRotate' className='episodesList__lastUpdate--i' />
          {getTimeAgo(mayorLastUpdate(anime))}
        </span>
      </div>
      <ul className='list'>
        <li className='list__item--title'>Episodios de {toPascalCase(namePage)}</li>
        {episodes.map(episode => {
          const isRecently = Date.now() < episode.lastUpdate + Timestamps.eight_hours
          return (
            <li className='list__item' key={episode.episode}>
              <a className='list__item' href={episode.link} target='_blank' rel='noreferrer'>
                <p className={`list__item--episode ${isRecently ? 'list__item--episodeNew' : ''}`}>
                  Episodio {episode.episode}
                </p>
                <p className='list__item--lastUpdate'>{getTimeAgo(episode.lastUpdate)}</p>
                <Icons className='list__item--redirect' iconName='IconExternalLink' />
              </a>
            </li>
          )
        })}
      </ul>
    </>
  )
}
