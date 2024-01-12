import type { EnabledSettings, InAwait, NotificationsInAired } from '../../../../types'
import enabledSettings from './enabledSettings'

const inAwait: InAwait = {
  cantRemitted: 4,
  expireIn: 100,
  created: 100,
  anime: {
    title: '', // no usage
    episode: 0, // no usage
    image: '', // no usage
    id: 0, // no usage
    namePages: ['animePage1', 'animePage2']
  },
  pastLengthPages: 0
}
const settings: NotificationsInAired = {
  maxRemitted: 3,
  delay: 100,
  expireIn: 100,
  minPages: 3
}

describe('Enabled Settings', () => {
  test('All settings Fails', () => {
    const result = enabledSettings({ timeNow: 200, inAwait, settings })
    expect(result).toStrictEqual({
      expiredDelay: false,
      expiredNotification: false,
      remittedRange: false,
      satisfiesMinPages: false,
      remittedEnabled: true
    } satisfies EnabledSettings)
  })
  test('All settings Passes', () => {
    inAwait.anime.namePages = ['animePage1', 'animePage2', 'animePage3', 'animePage4']
    inAwait.cantRemitted = 2
    const result = enabledSettings({ timeNow: 400, inAwait, settings })
    expect(result).toStrictEqual({
      expiredDelay: true,
      expiredNotification: true,
      remittedRange: true,
      satisfiesMinPages: true,
      remittedEnabled: true
    } satisfies EnabledSettings)
  })
  test('case Satisfies Min Pages: settings.minPages and inAwait is equals', () => {
    inAwait.anime.namePages = ['animePage1', 'animePage2', 'animePage3']
    const result = enabledSettings({ timeNow: 0, inAwait, settings })
    expect(result.satisfiesMinPages).toBeTruthy()
  })
  test('case RemittedRange: maxRemitted and countRemitted is equals', () => {
    inAwait.cantRemitted = 3
    const result = enabledSettings({ timeNow: 0, inAwait, settings })
    expect(result.remittedRange).toBeTruthy()
  })
  test('case Remitted Disabled', () => {
    settings.maxRemitted = 0
    const result = enabledSettings({ timeNow: 0, inAwait, settings })
    expect(result.remittedEnabled).toBeFalsy()
  })
})
