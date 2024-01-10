/* eslint-disable no-undef */

import { type InAwait, type NotificationsInAired } from '../../../../types'
import { canSendMessage } from './canSendMessage'
const currentTime = Date.now()
const inAwait: InAwait = {
  cantRemitted: 0,
  expireIn: 0,
  created: 0,
  anime: {
    title: '',
    episode: 0,
    image: '',
    id: 0,
    namePages: []
  },
  pastLengthPages: 0
}
const settings: NotificationsInAired = {
  maxRemitted: 0,
  delay: 0,
  expireIn: 0,
  minPages: 0
}
describe('Can Send Messages', () => {
  const send = canSendMessage({ currentTime, inAwait, settings })
  console.log(send)
  test('test', () => {
    expect(1 + 1).toBe(2)
  })
})
