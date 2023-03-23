import { Browser } from 'playwright'
import { InfoEpisodeRecovered } from '../../../../types'
type NewPagesSettings = {
  browser: Browser
  url: string
  pageTitle: string
  selectorAwait: string
  callback: () => InfoEpisodeRecovered[]
}
export async function newPageToScrap(newPagesSettings: NewPagesSettings) {
  const { browser, pageTitle, url, selectorAwait, callback } = newPagesSettings
  let error = {
    message: '',
    value: false,
  }
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'commit', timeout: 15000 }).catch(() => {
    error = { message: 'timeout to load page', value: true }
  })
  await page.waitForSelector(selectorAwait, { timeout: 10000 }).catch(() => {
    error = { message: 'timeout to awaited selector', value: true }
  })
  if (error.value === true) {
    await page.screenshot({ path: `./screenshot-error/${Date.now()}${pageTitle}.png` })
    return { content: { [pageTitle]: [] }, error }
  }
  const content = await page.evaluate(callback)
  await page.close()
  return { content: { [pageTitle]: content.reverse() }, error }
}
