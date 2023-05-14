import { Agent as HttpAgent } from 'node:http'
import { Agent as HttpsAgent } from 'node:https'
import agentkeepalive from 'agentkeepalive'
type Method =
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
type Headers = Record<string, string | string[] | undefined>
type Agents = {
  http?: HttpAgent | false
  https?: HttpsAgent | false
  http2?: unknown | false
}
export type ResponseType = 'json' | 'buffer' | 'text'
export default async function getHtml(url: string) {
  try {
    const got = (await import('got')).got
    const options: {
      method: Method
      decompress: boolean
      agent: Agents
      responseType: ResponseType
      dnsCache: boolean
      headers: Headers
    } = {
      method: 'GET',
      decompress: false,
      agent: {
        http: new agentkeepalive({
          keepAlive: false,
        }),
        https: new agentkeepalive.HttpsAgent({
          keepAlive: false,
        }),
      },
      responseType: 'buffer',
      dnsCache: true,
      headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) ' },
    }
    const response = await got(url, options)
    if (response.statusCode !== 200) throw new Error(response.statusMessage)
    const content: Buffer = response.body as Buffer
    return { content: content.toString('utf-8') }
  } catch (e) {
    return {
      error: true,
      bodyError: e,
      content: null,
    }
  }
}
