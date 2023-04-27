import { AnimeList } from '../../../../../../types'

type Props = {
  anime: AnimeList
}
function formatTime(duration?: number): string {
  if (!duration) return ''
  const inHours = duration / 60
  const hasHour = Math.floor(inHours) > 1
  if (hasHour) return `${inHours.toFixed(1)} Hora/s`
  return `${duration} Minuto/s`
}
function Metadata({ anime }: Props) {
  const { episodes, id, format, status, averageScore, duration } = anime.dataAnilist
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
      {renderMetadata(Boolean(duration), formatTime(duration))}
    </div>
  )
}

export default Metadata
