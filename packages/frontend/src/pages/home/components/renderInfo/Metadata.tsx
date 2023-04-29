import { AnimeList } from '../../../../../../types'

type Props = {
  anime: AnimeList
}
function formatTime(duration?: number): string {
  if (!duration) return ''
  const inHours = Math.floor(duration / 60)
  const hasHour = inHours > 0
  const inMinutes = hasHour ? Math.floor((duration / 60 - inHours) * 60) : duration
  if (hasHour) return `${inHours} Horas ${inMinutes > 0 ? inMinutes + ' minutos' : ''}`
  return `${inMinutes} Minutos`
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
