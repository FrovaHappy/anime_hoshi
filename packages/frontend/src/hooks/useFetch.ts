async function useFetch({ url, method, body }: { url: string; method: string; body?: Object }) {
  let options = {
    method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body ?? {}),
  }
  const data: any | null = await fetch(url, options)
    .then((res) => res.json())
    .catch(() => null)

  return data
}

export default useFetch
