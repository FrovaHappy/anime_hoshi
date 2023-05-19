import { useEffect, useState } from 'react'
export const enum ErrorTypes {
  tokenInvalid = 'tokenInvalid',
  tokenNotFound = 'tokenNotFound',
  requestError = 'requestError',
}
export function getUser() {
  const token = window.localStorage.getItem('token')
  const [error, SetError] = useState<ErrorTypes | undefined>()
  const [load, setLoad] = useState(true)
  let data
  useEffect(() => {
    if (!token) {
      setLoad(false)
      SetError(ErrorTypes.tokenNotFound)
      data = { error, load, data: null }
    }
    setLoad(false)
  }, [])
  return data ?? { error, load, data: { token } }
}
