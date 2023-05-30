import { useEffect, useState } from 'react'
import { KeysLocalStorage } from '../../../enum'
import useFetch from '../../../hooks/useFetch'
import { urlApi } from '../../../config'
import { Log } from '../../../../../types'

type ErrorLog = '' | 'bad_feth' | 'bad_token'
function RenderLogsOfData(logs: Log[] | null, error: ErrorLog) {
  if (error === 'bad_feth') return <>ocurrio un problema con la peticion</>
  if (error === 'bad_token') return <>la sesion expiro o es requerida</>
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
function getLogs(deps: any[]) {
  const [error, setError] = useState<ErrorLog>('')
  const [load, setLoad] = useState(true)
  const [contents, setContents] = useState<string[] | null>(null)
  let result: { error: ErrorLog; contents: string[] | null; load: boolean } = { error, contents, load }
  useEffect(() => {
    const token = window.localStorage.getItem(KeysLocalStorage.token)
    if (!token) {
      setError('bad_token')
      setLoad(false)
      result = { error, contents, load }
    } else {
      const fethLogs = async () => {
        const response = await useFetch({ url: `${urlApi}/logs`, method: 'GET', authorization: token })
        setLoad(false)
        if (!response) return setError('bad_feth')
        if (response.code !== 200) return setError('bad_feth')
        setContents(response.contents)
        result = { error, contents, load }
      }
      fethLogs()
    }
  }, deps)
  return result
}

function getDataNow() {
  const date = new Date()
  const day = date.getUTCDate()
  const month = date.getUTCMonth()
  const year = date.getUTCFullYear()
  return { string: `${year}-${month}-${day}`, year, month, day }
}
/**
 * @param date this must have the following format: `YY-MM-dd`
 */
function getLogOnData(date: string, deps: any[]) {
  const [error, setError] = useState<ErrorLog>('')
  const [load, setLoad] = useState(true)
  const [contents, setContents] = useState<Log[] | null>(null)
  let result: { error: ErrorLog; contents: Log[] | null; load: boolean } = { error, contents, load }
  useEffect(() => {
    const token = window.localStorage.getItem(KeysLocalStorage.token)
    if (!token) {
      setError('bad_token')
      setLoad(false)
      result = { error, contents, load }
    } else {
      const fethLogs = async () => {
        const response = await useFetch({ url: `${urlApi}/logs?onDate=${date}`, method: 'GET', authorization: token })
        setLoad(false)
        if (!response) return setError('bad_feth')
        if (response.code !== 200) return setError('bad_feth')
        setContents(response.contents)

        result = { error, contents, load }
      }
      fethLogs()
    }
  }, deps)
  return result
}
function RenderLogs(error: ErrorLog, contents: string[] | null, setData: (v: string) => void) {
  if (error === 'bad_feth') return <>ocurrio un problema con la peticion</>
  if (error === 'bad_token') return <>la sesion expiro o es requerida</>
  if (!contents) return <>este parece un lugar tranquilo</>
  return contents?.map((data, key) => {
    return (
      <button key={key} onClick={() => setData(data)}>
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
      <div>{logs.load ? <> loading logs datas </> : RenderLogs(logs.error, logs.contents, setData)}</div>
      <div>{logsOnData.load ? <>loading logs </> : RenderLogsOfData(logsOnData.contents, logsOnData.error)}</div>
    </>
  )
}