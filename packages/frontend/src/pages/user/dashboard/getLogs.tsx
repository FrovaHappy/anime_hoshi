import { useEffect, useState } from 'react'
import { KeysLocalStorage } from '../../../enum'
import useFetch from '../../../hooks/useFetch'
import { urlApi } from '../../../config'
import { type ErrorLog, type ResultLog } from './logPanel'

export function getLogs(deps: any[]) {
  const [error, setError] = useState<ErrorLog>('')
  const [load, setLoad] = useState(true)
  const [contents, setContents] = useState<string[] | null>(null)
  let result: ResultLog = {
    error,
    contents,
    load
  }
  useEffect(() => {
    const token = window.localStorage.getItem(KeysLocalStorage.token)
    if (!token) {
      setError('bad_token')
      setLoad(false)
      result = { error, contents, load }
    } else {
      const fetchLogs = async () => {
        const response = await useFetch<string[]>({
          url: `${urlApi}/logs`,
          method: 'GET',
          authorization: token
        })
        setLoad(false)
        if (!response) {
          setError('bad_fetch')
          return
        }
        if (response.code !== 200) {
          setError('bad_fetch')
          return
        }
        setContents(response.contents)
        result = { error, contents, load }
      }
      fetchLogs().catch(() => {
        throw new Error('failed to fetch logs')
      })
    }
  }, deps)
  return result
}
