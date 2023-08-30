import { useEffect, useState } from 'react'
import { urlApi } from '../../../../../config'
import { KeysLocalStorage } from '../../../../../enum'
import useFetch from '../../../../../hooks/useFetch'

type ErrorUser = 'token invalid' | 'error fetch' | ''
export interface User {
  newToken: string
  username: string
  roles: string[]
}
interface ResultUser {
  error: ErrorUser
  contents: User | null
  load: boolean
}
export default function useUser(deps: any[]) {
  const [error, setError] = useState<ErrorUser>('')
  const [load, setLoad] = useState(true)
  const [contents, setContents] = useState<User | null>(null)

  let result: ResultUser = {
    error,
    contents,
    load
  }

  useEffect(() => {
    const token = window.localStorage.getItem(KeysLocalStorage.token)
    if (!token) {
      setError('token invalid')
      setLoad(false)
      result = { error, contents, load }
    } else {
      const fetchUser = async () => {
        const response = await useFetch<User>({
          url: `${urlApi}/user`,
          method: 'GET',
          authorization: token
        })
        setLoad(false)
        if (response.code !== 200) {
          window.localStorage.removeItem(KeysLocalStorage.token)
          setError('token invalid')
          return
        }
        window.localStorage.setItem(KeysLocalStorage.token, response.contents.newToken)
        setContents(response.contents)
        result = { error, contents, load }
      }
      fetchUser().catch(() => {
        setLoad(false)
        result = { error: 'error fetch', contents, load }
      })
    }
  }, deps)
  return result
}
