var cacheInternal: { [key: string]: string | undefined } = {}
function get(key: string) {
  let value = cacheInternal[key]
  if (!value) return value
  const getvalue = JSON.parse(value)
  return getvalue
}
function set(key: string, value: Array<any> | Object) {
  const setvalue = JSON.stringify(value)
  cacheInternal[key] = setvalue
}

export default { get, set }
