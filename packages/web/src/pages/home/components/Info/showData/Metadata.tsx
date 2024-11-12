import type React from 'react'
import { type Anime } from '../../../../../../../types/Anime'
import Icons from '../../../../../Icons'
import { toPascalCase } from '../../../../../utils/general'
import './index.scss'
interface Props {
  anime: Anime
}
function formatTime(duration: number | null): string {
  if (!duration) return ''
  const inHours = Math.floor(duration / 60)
  const hasHour = inHours > 0
  const inMinutes = hasHour ? Math.floor((duration / 60 - inHours) * 60) : duration
  if (hasHour) return `${inHours} Horas ${inMinutes > 0 ? `${inMinutes} minutos` : ''}`
  return `${inMinutes} Minutos`
}
function Metadata({ anime }: Props) {
  const { episodes, id, format, status, averageScore, duration } = anime
  const renderMetadata = (hasContent: boolean, content: React.ReactNode) => {
    return hasContent ? <div className='metadata__item'>{content}</div> : null
  }

  return (
    <div className='metadata'>
      {renderMetadata(
        Boolean(averageScore),
        <>
          <Icons iconName='IconStar' className='metadata__star' />
          <p>{averageScore ?? ''}% </p>
        </>,
      )}
      {renderMetadata(Boolean(id), `Id: ${id}`)}
      {renderMetadata(Boolean(episodes), `${episodes ?? ''} Episodios`)}
      {renderMetadata(Boolean(format), toPascalCase(`${format}`))}
      {renderMetadata(Boolean(status), toPascalCase(`${status}`))}
      {renderMetadata(Boolean(duration), formatTime(duration))}
    </div>
  )
}

export default Metadata
