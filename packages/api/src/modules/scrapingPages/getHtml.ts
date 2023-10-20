import Agentkeepalive from 'agentkeepalive'
import type { Headers, Agents, CacheOptions, Method, ResponseType } from './types'
import Log from '../../shared/log'

export default async function getHtml (url: string) {
  try {
    const got = (await import('got')).got
    const options: {
      method: Method
      decompress: boolean
      agent: Agents
      responseType: ResponseType
      dnsCache: boolean
      headers: Headers
      cacheOptions: CacheOptions
      handlers?: any
    } = {
      method: 'GET',
      decompress: false,
      agent: {
        http: new Agentkeepalive({
          keepAlive: false
        }),
        https: new Agentkeepalive.HttpsAgent({
          keepAlive: false
        })
      },
      responseType: 'buffer',
      dnsCache: true,
      cacheOptions: {
        shared: true,
        cacheHeuristic: 0.1,
        immutableMinTimeToLive: 24 * 3600 * 1000, // 24h
        ignoreCargoCult: true
      },
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
      }
    }
    const response = await got(url, options)
    const content: Buffer = response.body as Buffer
    return { content: content.toString('utf-8') }
  } catch (e: any) {
    const got = (await import('got')).got
    const { code } = e
    const urlObjet = new URL(url)
    await Log({
      type: 'warning',
      message: `[getHtml] ${urlObjet.hostname}  started his second request`,
      content: { url: urlObjet, code }
    })
    const response: string = await got
      .get(`http://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
      .then(response => {
        if (response.ok) return JSON.parse(response.body)
        throw new Error('Network response was not ok.')
      })
      .then(data => {
        return data.contents
      })
      // eslint-disable-next-line no-ex-assign
      .catch(err => (e = { fail: true, ...err }))
    if (e?.fail) {
      await Log({
        type: 'error',
        message: `[getHtml] ${urlObjet.hostname} `,
        content: { message: e.message, code: e.code, url: urlObjet }
      })
      return {
        error: true,
        bodyError: e,
        content: null
      }
    }

    return { content: response }
  }
}
