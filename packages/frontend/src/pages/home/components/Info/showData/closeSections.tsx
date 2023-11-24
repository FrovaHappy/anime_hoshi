import { useRef } from 'react'
import { type Anime } from '../../../../../../../types/Anime'
import Icons from '../../../../../Icons'

interface Props {
  anime: Anime
}
function LinkToAnilist({ anime }: Props) {
  return (
    <a href={`https://anilist.co/anime/${anime.dataAnilist.id}`} target='_blank' rel='noreferrer'>
      <div className='anilist'>
        <Icons iconName='IconExternalLink' className='anilist__iconExtern' />
        <div className='anilist__i'></div>
      </div>
    </a>
  )
}
interface PropsInfo {
  anime: Anime | null
  setPositionLeft: (k: any) => void
  handleClick: () => void
}
function closeSections({ anime, handleClick, setPositionLeft }: PropsInfo) {
  const left = useRef(false)
  return (
    <div className='actions'>
      <button className='actions__close' onClick={handleClick}>
        <Icons iconName='Back' className='actions__close--i' />
      </button>
      <span className='actions__space'></span>
      {(() => {
        if (anime) {
          return (
            <>
              <div
                className='actions__positions'
                onClick={() => {
                  left.current = !left.current
                  setPositionLeft(left.current)
                }}>
                <Icons
                  iconName={'AlignHorizontal'}
                  className={left.current ? 'actions__positions--active' : undefined}
                />
                <Icons
                  iconName={'AlignHorizontal'}
                  className={!left.current ? 'actions__positions--active' : undefined}
                />
              </div>
              <span className='actions__space'></span>
              <LinkToAnilist anime={anime} />
            </>
          )
        }
      })()}
    </div>
  )
}

export default closeSections
