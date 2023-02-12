import { hours } from '../enum'

function validInsideOf(hours: hours, timestamp: number): boolean {
  return Date.now() - timestamp < hours
}
export const isVisibly = (conditional: boolean): React.CSSProperties | undefined => {
  return conditional ? undefined : { visibility: 'hidden', height: 0, width: 0, margin: 0, overflow: 'hidden' }
}
export default {
  validInsideOf,
}
