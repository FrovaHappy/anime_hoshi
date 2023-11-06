import { useState } from 'react'
import { type Log } from '../../../../types'
import AwaitLoad from '../../components/AwaitLoad'
import useFetch from '../../hooks/useFetchNew'
import { urlApi } from '../../config'
import { KeysLocalStorage } from '../../enum'
import ErrorComponent from '../../components/Error'
export interface ResultLog<T = string> {
  error: string | null
  contents: T[] | null
  load: boolean
}
function RenderLogsOfData(logs: Log[] | null) {
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
function RenderLogs(contents: string[] | null, setData: (v: string) => void) {
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
  const token = window.localStorage.getItem(KeysLocalStorage.token) ?? ''
  const logs = useFetch({ query: { url: `${urlApi}/logs`, method: 'GET', authorization: token }, deps: [] })
  const logsOnData = useFetch({
    query: {
      url: `${urlApi}/logs?onDate=${data}`,
      method: 'GET',
      authorization: token
    },
    deps: [data]
  })
  if (logs.error ?? logsOnData.error) {
    return (
      <ErrorComponent
        code={logs.errorCode || logsOnData.errorCode}
        message={logs.error ?? logsOnData.error ?? 'no controlled'}
      />
    )
  }
  return (
    <>
      <div>{logs.load ? <AwaitLoad /> : RenderLogs(logs.contents, setData)}</div>
      <div>{logsOnData.load ? <AwaitLoad /> : RenderLogsOfData(logsOnData.contents)}</div>
    </>
  )
}
