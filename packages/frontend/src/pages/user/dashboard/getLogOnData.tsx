import { useEffect, useState } from 'react'
import { KeysLocalStorage } from '../../../enum'
import useFetch from '../../../hooks/useFetch'
import { urlApi } from '../../../config'

import { type Log } from '../../../../../types'
import { type ErrorLog, type ResultLog } from './logPanel'

/**
 * @param date this must have the following format: `YY-MM-dd`
 */
export function getLogOnData(date: string, deps: any[]) {
  const [error, setError] = useState<ErrorLog>('')
  const [load, setLoad] = useState(true)
  const [contents, setContents] = useState<Log[] | null>(null)
  let result: ResultLog<Log> = { error, contents, load }
  useEffect(() => {
    const token = window.localStorage.getItem(KeysLocalStorage.token)
    if (!token) {
      setError('bad_token')
      setLoad(false)
      result = { error, contents, load }
    } else {
      const fetchLogs = async () => {
        const response = await useFetch<Log[]>({
          url: `${urlApi}/logs?onDate=${date}`,
          method: 'GET',
          authorization: token
        })
        setLoad(false)
        if (response.code !== 200) {
          setError('error fetch')
          return
        }
        setContents(response.contents)

        result = { error, contents, load }
      }
      fetchLogs().catch(() => {
        setLoad(false)
        result = { error: 'error fetch', contents, load }
      })
    }
  }, deps)
  return result
}
