import { AnimeList } from '../../../../../../types'

type Props = {
  anime: AnimeList
}
function Metadata({ anime }: Props) {
  const { episodes, id, format, status, averageScore } = anime.dataAnilist
  const renderMetadata = (hasContent: boolean, content: string) => {
    return hasContent ? <div className="renderInfo__metadata--item">{content}</div> : null
  }

  return (
    <div className="renderInfo__metadata">
      {renderMetadata(Boolean(averageScore), `⭐ ${averageScore}%`)}
      {renderMetadata(Boolean(id), `ID ${id}`)}
      {renderMetadata(Boolean(episodes), `${episodes} Episodios`)}
      {renderMetadata(Boolean(format), `${format}`)}
      {renderMetadata(Boolean(status), `${status}`)}
    </div>
  )
}

export default Metadata
