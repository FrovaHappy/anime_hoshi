import { type Anime } from '../../../../../../types/Anime'
import Icons from '../../../../Icons'
import { useContextAnime } from '../../../contexts/contextHome'
import Metadata from './Metadata'
interface Props {
  anime: Anime
}
function LinkToAnilist({ anime }: Props) {
  return (
    <a className="anilist" href={`https://anilist.co/anime/${anime.dataAnilist.id}`} target="_blank" rel="noreferrer">
      <Icons iconName="IconExternalLink" className="anilist__externalLink" />
      <span>Ver en Anilist</span>
      <img className="anilist__img" src="/pages_icons/anilist.svg" alt="anilist icons" />
    </a>
  )
}
function parseDescription(description: string | null) {
  if (description) {
    description = description.replaceAll(/(<[/]?i>)+/g, '')
    const descriptionArray = description.split(/(<br>[\s]?)+/g).filter((v) => !v.includes('<br>'))
    return descriptionArray.map((des, i) => <p key={i}>{des}</p>)
  }
  return <p>No se que anime se trata, pero esta buenísimo. Te lo recomiendo 19/10 👍 </p>
}
function Description({ anime }: Props) {
  return (
    <div className="renderInfo__description">
      <img
        className="renderInfo__description--img"
        src={anime.dataAnilist.coverImage.large}
        alt={anime.dataAnilist.title.romaji}
      />
      <p className="renderInfo__description--title">Descripción:</p>
      <div className="renderInfo__description--body">{parseDescription(anime.dataAnilist.description)}</div>
    </div>
  )
}
interface PropsInfo {
  anime: Anime
  close: () => void
}
function Info({ anime, close }: PropsInfo) {
  const { setAnimeMinfied } = useContextAnime()
  return (
    <>
      <div className="renderInfo__actions">
        <button
          className="renderInfo__actions--close"
          onClick={() => {
            setAnimeMinfied(null)
            close()
          }}
        >
          <Icons iconName="IconClose" />
        </button>
        <LinkToAnilist anime={anime} />
      </div>
      <h3 className="renderInfo__title">{anime.dataAnilist.title.romaji}</h3>
      <Metadata anime={anime} />
      <Description anime={anime} />
      {/* <RenderEpisodesDropdown /> */}
    </>
  )
}

Info.propTypes = {}

export default Info
