import { useState } from 'react'
import { type Log } from '../../../../../types'
import { getLogs } from './getLogs'
import { getLogOnData } from './getLogOnData'
import AwaitLoad from '../../../components/AwaitLoad'
export interface ResultLog<T = string> {
  error: ErrorLog
  contents: T[] | null
  load: boolean
}
export type ErrorLog = '' | 'error fetch' | 'bad_token'
function RenderLogsOfData(logs: Log[] | null, error: ErrorLog) {
  if (error === 'error fetch') return <>ocurrió un problema con la petición</>
  if (error === 'bad_token') return <>la sesión expiro o es requerida</>
  return logs?.map((log, key) => {
    return (
      <div key={key}>
        <span>
          {log.type} - {log.message}
        </span>
      </div>
    )
  })
}
function getDataNow() {
  const date = new Date()
  const day = date.getUTCDate()
  const month = date.getUTCMonth()
  const year = date.getUTCFullYear()
  return { string: `${year}-${month}-${day}`, year, month, day }
}
function RenderLogs(error: ErrorLog, contents: string[] | null, setData: (v: string) => void) {
  if (error === 'error fetch') return <>ocurrió un problema con la petición</>
  if (error === 'bad_token') return <>la sesión expiro o es requerida</>
  if (!contents) return <>este parece un lugar tranquilo</>
  return contents?.map((data, key) => {
    return (
      <button
        key={key}
        onClick={() => {
          setData(data)
        }}>
        {data}
      </button>
    )
  })
}
export default function Main() {
  const [data, setData] = useState(getDataNow().string)
  const logs = getLogs([])
  const logsOnData = getLogOnData(data, [data])
  return (
    <>
      <div>{logs.load ? <AwaitLoad /> : RenderLogs(logs.error, logs.contents, setData)}</div>
      <div>{logsOnData.load ? <AwaitLoad /> : RenderLogsOfData(logsOnData.contents, logsOnData.error)}</div>
    </>
  )
}
