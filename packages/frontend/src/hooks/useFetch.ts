/**
 * @returns returns the json response already solved, in case of error returns null
 */
async function useFetch({
  url,
  method,
  body,
  authorization = '',
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
      'Content-Type': 'application/json;charset=utf-8',
    }),
    body: body ? JSON.stringify(body) : undefined,
  }

  const data: any | null = await (await fetch(url, options)).json()
    .catch(() => {
      return null
    })

  return data
}

export default useFetch
