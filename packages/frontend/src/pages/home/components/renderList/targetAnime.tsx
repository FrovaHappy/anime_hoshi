import Icon from '../../../../Icons'
import { type AnimeMinified } from '../../../../../../types/Anime'
import { setColorPrimary } from '../../../../utils/toogleColorPrimary'
import { useIdContext } from '../../../contexts/contextHome'
import './targetAnime.scss'
import { memo, useRef } from 'react'

interface Props {
  thisAnime: AnimeMinified
}
function TargetAnimeConponent({ thisAnime }: Props) {
  const { id, setId } = useIdContext()
  const hasOnClickPrevious = useRef(false)
  const compareId = thisAnime.id === id
  const color = thisAnime.color
  const newEpisode = Date.now() - thisAnime.lastUpdate < 28_800_000
  const setOpaqueImg = compareId || !id ? '' : 'targetAnime__img--opaque'

  const onClickAnime = () => {
    if (!compareId) hasOnClickPrevious.current = false
    if (compareId && hasOnClickPrevious.current) {
      setId(null)
      hasOnClickPrevious.current = false
      window.history.pushState(null, '', '/')
    } else {
      setId(thisAnime.id)
      window.history.pushState(null, '', '/?id=' + thisAnime.id.toString())
      hasOnClickPrevious.current = true
    }
    setColorPrimary(color)
  }
  return (
    <div className={'targetAnime ' + setOpaqueImg} onClick={onClickAnime}>
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
export default memo(TargetAnimeConponent)
