import { useEffect, useState } from 'react'
import { type JsonResponse } from '../../../types'
interface Props {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: Record<string, any>
  authorization?: string
}
/**
 * @returns returns the json response already solved, in case of error returns null
 */
export async function buildFetch<T = any>({ url, method, body, authorization = '' }: Props) {
  const options = {
    method,
    headers: new Headers({
      Authorization: 'Bearer ' + authorization,
      'Content-Type': 'application/json;charset=utf-8'
    }),
    body: body ? JSON.stringify(body) : undefined
  }
  try {
    const data = (await (await fetch(url, options)).json()) as JsonResponse<T>
    if ([200, 201].some(code => code === data.code)) return { error: false, data: data.contents }
    console.error({ options, url, data })
    return { error: true, data: data.contents }
  } catch (error) {
    console.error({ error, options, url })
    throw new Error('Error building fetch')
  }
}
type Error = '' | 'error fetch' | 'bad response'
interface MainProps {
  query: Props
  deps: any[]
}
export default function useFetch<T = any>({ query, deps }: MainProps) {
  const [error, setError] = useState<Error>('')
  const [load, setLoad] = useState(true)
  const [contents, setContents] = useState<T | null>(null)
  let result = { error, load, contents }
  useEffect(() => {
    const fetch = async () => {
      const data = await buildFetch(query)
      setLoad(false)
      if (data.error) {
        setError('')
        setContents(data.data)
        result = { error, load, contents }
        return
      }
      setError('bad response')
      console.warn({ message: 'case of code no controlled', data })
      result = { error, load, contents }
    }
    fetch().catch(() => {
      setError('error fetch')
      setLoad(false)
      result = { error, load, contents }
    })
  }, deps)

  return result
}
