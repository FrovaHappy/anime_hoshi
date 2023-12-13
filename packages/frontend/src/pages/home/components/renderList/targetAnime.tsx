import Icon from '../../../../Icons'
import { type AnimeMinified } from '../../../../../../types/Anime'
import { setColorPrimary } from '../../../../utils/toogleColorPrimary'
import { useIdContext } from '../../../contexts/contextHome'
import './targetAnime.scss'
import { memo, useRef, useState } from 'react'
import useLazyloadImage from '../../../../hooks/useLazyload'
import { IMAGE_TRANSPARENT } from '../../../../utils/const'

declare module 'react' {
  // eslint-disable-next-line no-undef
  interface HTMLAttributes<T> extends React.AriaAttributes, React.DOMAttributes<T> {
    fetchpriority?: 'high' | 'low' | 'auto'
  }
}
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
  const [isLoadedPreviewImg, setLoadedPreviewImg] = useState(false)
  const { ref } = useLazyloadImage(thisAnime.image, isLoadedPreviewImg)

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

      <img
        className='targetAnime__img'
        src={IMAGE_TRANSPARENT}
        // eslint-disable-next-line react/no-unknown-property
        fetchpriority='low'
        onLoad={() => {
          setLoadedPreviewImg(true)
        }}
        ref={ref}
        alt={thisAnime.title}
      />
      <p className='targetAnime__title'>{thisAnime.title}</p>
    </div>
  )
}
export default memo(TargetAnimeConponent)
