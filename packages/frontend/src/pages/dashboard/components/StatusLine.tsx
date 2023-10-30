import { type ValidateResult, type ScrapPage } from '../../../../../types/ScrapEpisode'
import './StatusLine.scss'
interface Props {
  scrapPage: ScrapPage
}
export default function StatusLine({ scrapPage }: Props) {
  const validatesResults: ValidateResult[] = []
  for (let i = 0; i < 45; i++) {
    validatesResults.push(scrapPage.validatesResults[i] ?? null)
  }
  return (
    <div className='statusLine'>
      <div className='statusLine__status'>
        {validatesResults.map((validateResult, i) => {
          if (!validateResult) return <span key={i} className='status' />
          if (!validateResult.passHTML && !validateResult.passTargetSelector) {
            return <span key={i} className='status__critical' />
          }
          if (
            !validateResult.passEpisodePosition ||
            !validateResult.passEpisodeSelector ||
            !validateResult.passTitleSelector ||
            !validateResult.passUrlEpisodeSelector
          ) {
            return <span key={i} className='status__warn' />
          }
          return <span key={i} className='status__normal' />
        })}
      </div>
      <div className='statusLine__texts'>
        <p>intervalo de 15 min</p>
        <p>ahora</p>
      </div>
    </div>
  )
}
