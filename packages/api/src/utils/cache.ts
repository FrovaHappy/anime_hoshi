import type { CacheKeys } from '../../type'

// eslint-disable-next-line prefer-const
let cacheInternal: Record<string, string | undefined> = {}
function get (key: CacheKeys) {
  const value = cacheInternal[key]
  if (!value) return value
  const getvalue = JSON.parse(value)
  return getvalue
}
function set (key: CacheKeys, value: any[] | object | number | string) {
  const setvalue = JSON.stringify(value)
  cacheInternal[key] = setvalue
}

export default { get, set }
