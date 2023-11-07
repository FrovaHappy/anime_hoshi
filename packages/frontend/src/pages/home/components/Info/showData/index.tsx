import { type Anime } from '../../../../../../../types/Anime'
import ListEpisodes from './EpisodesList'
import Metadata from './Metadata'
import CloseSections from './closeSections'
import './index.scss'

interface Props {
  anime: Anime
}

export function parseDescription(description: string | null) {
  if (description) {
    description = description.replaceAll(/(<[/]?i>)+/g, '')
    const descriptionArray = description.split(/(<br>[\s]?)+/g).filter(v => !v.includes('<br>'))
    return descriptionArray.map((des, i) => <p key={i}>{des}</p>)
  }
  return <p>No se que anime se trata, pero esta buenísimo. Te lo recomiendo 19/10 👍 </p>
}
export function Description({ anime }: Props) {
  return (
    <div className='description'>
      <img className='description__img' src={anime.dataAnilist.coverImage.large} alt={anime.dataAnilist.title.romaji} />
      <p className='description__title'>Descripción:</p>
      <div className='description__body'>{parseDescription(anime.dataAnilist.description)}</div>
    </div>
  )
}
interface PropsInfo {
  anime: Anime
  close: () => void
}

function Info({ anime }: PropsInfo) {
  return (
    <>
      <CloseSections anime={anime} />
      <h3 className='title'>{anime.dataAnilist.title.romaji}</h3>
      <Metadata anime={anime} />
      <Description anime={anime} />
      <ListEpisodes anime={anime} />
    </>
  )
}
export default Info
