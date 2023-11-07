import { type Anime } from '../../../../../../../types/Anime'
import Icons from '../../../../../Icons'
import { useContextAnime } from '../../../../contexts/contextHome'
import './index.scss'

interface Props {
  anime: Anime
}
function LinkToAnilist({ anime }: Props) {
  return (
    <a href={`https://anilist.co/anime/${anime.dataAnilist.id}`} target='_blank' rel='noreferrer'>
      <div className='anilist'>
        <p className='anilist__text'>ir a Anilist</p>
        <div className='anilist__i'></div>
      </div>
    </a>
  )
}
interface PropsInfo {
  anime: Anime | null
}
function closeSections({ anime }: PropsInfo) {
  const { setAnimeMinfied } = useContextAnime()
  return (
    <div className='actions'>
      <button
        className='actions__close'
        onClick={() => {
          setAnimeMinfied(null)
        }}>
        <Icons iconName='Back' className='actions__close--i' />
      </button>
      <span className='actions__space'></span>
      {anime ? <LinkToAnilist anime={anime} /> : null}
    </div>
  )
}

export default closeSections
