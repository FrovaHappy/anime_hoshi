import { Agent as HttpAgent } from 'node:http'
import { Agent as HttpsAgent } from 'node:https'

export type CacheOptions = {
  shared?: boolean
  cacheHeuristic?: number
  immutableMinTimeToLive?: number
  ignoreCargoCult?: boolean
}
export type Method =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'HEAD'
  | 'DELETE'
  | 'OPTIONS'
  | 'TRACE'
  | 'get'
  | 'post'
  | 'put'
  | 'patch'
  | 'head'
  | 'delete'
  | 'options'
  | 'trace'
export type Headers = Record<string, string | string[] | undefined>
export type Agents = {
  http?: HttpAgent | false
  https?: HttpsAgent | false
  http2?: unknown | false
}
export type ResponseType = 'json' | 'buffer' | 'text'
