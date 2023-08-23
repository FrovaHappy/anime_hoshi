/**
 * @returns returns the json response already solved, in case of error returns null
 */
interface JSONResponse<T> {
  code: number
  message: string
  contents: T
}
async function useFetch<T = any>({
  url,
  method,
  body,
  authorization = ''
}: {
  url: string
  method: string
  body?: Record<string, any>
  authorization?: string
}) {
  const options = {
    method,
    headers: new Headers({
      Authorization: 'Bearer ' + authorization,
      'Content-Type': 'application/json;charset=utf-8'
    }),
    body: body ? JSON.stringify(body) : undefined
  }

  const data: any | null = await (await fetch(url, options)).json().catch(() => {
    return null
  })

  return data as JSONResponse<T>
}

export default useFetch
