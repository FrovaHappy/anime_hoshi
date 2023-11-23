import type React from 'react'
import Icon from '../../../../Icons'
import { type AnimeMinified } from '../../../../../../types/Anime'
import { setColorPrimary } from '../../../../utils/toogleColorPrimary'
import { useContextAnime } from '../../../contexts/contextHome'
import './targetAnime.scss'
import { useRef } from 'react'

interface Props {
  thisAnime: AnimeMinified
}

export const isVisibly = (conditional: boolean): React.CSSProperties | undefined => {
  return conditional ? undefined : { visibility: 'hidden', height: 0, width: 0, margin: 0, overflow: 'hidden' }
}
export default function TargetAnimeConponent({ thisAnime }: Props) {
  const { animeMinfied, setAnimeMinfied } = useContextAnime()
  const hasOnClickPrevius = useRef(false)
  const compareId = thisAnime.id === animeMinfied?.id
  const color = thisAnime.color
  const newEpisode = Date.now() - thisAnime.lastUpdate < 28_800_000
  const setOpaqueImg = compareId || !animeMinfied ? '' : 'targetAnime__img--opaque'
  return (
    <div
      className={'targetAnime ' + setOpaqueImg}
      onClick={() => {
        if (!compareId) hasOnClickPrevius.current = false
        if (compareId && hasOnClickPrevius.current) {
          setAnimeMinfied(null)
          hasOnClickPrevius.current = false
        } else {
          setAnimeMinfied(thisAnime)
          hasOnClickPrevius.current = true
        }
        setColorPrimary(color)
      }}>
      <div className='targetAnime__episode' style={newEpisode ? { background: 'var(--color-primary)' } : undefined}>
        <p className='targetAnime__episode--text'>
          <Icon iconName='Layers' className='targetAnime__episode--icon' /> Ep. {thisAnime.episode}
        </p>
      </div>
      <img className='targetAnime__img' src={thisAnime.image} alt={thisAnime.title} loading='lazy' />
      <p className='targetAnime__title'>{thisAnime.title}</p>
    </div>
  )
}
