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
  body?: Object
  authorization?: string
}) {
  let options = {
    method,
    headers: new Headers({
      Authorization: 'Bearer ' + authorization,
      'Content-Type': 'application/json;charset=utf-8',
    }),
    body: body ? JSON.stringify(body) : undefined,
  }

  const data: any | null = await fetch(url, options)
    .then((res) => res.json())
    .catch((e) => {
      return null
    })

  return data
}

export default useFetch
