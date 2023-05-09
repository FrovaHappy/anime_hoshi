import { PagesNames } from '../../type'
import validateResult from '../utils/validationResult'
import { check } from 'express-validator'
type Episode = {
  updateEpisode?: number
  pagesUrl?: {
    [key: string]:
      | {
          url?: string
          update?: number
        }
      | undefined
  }
}
const PagesNamesObj: { [x: string]: PagesNames } = {
  animeFlv: 'animeFlv',
  monosChinos: 'monosChinos',
  animeblix: 'animeblix',
  jkanime: 'jkanime',
}
function checkEpisodesStructure(episodes: { [x: string]: Episode }) {
  const errorMessage = {
    ofEpisodesNumber: () => {
      throw new Error('"{[x:string]:{}}" x cannot format to number correctly.')
    },
    ofUpdateEpisode: () => {
      throw new Error('Alone episodes[x:string].updateEpisode dont is typeOf number')
    },
    ofPageUrl: () => {
      throw new Error('Alone episodes[x:string].pagesUrl not is typeof object')
    },
    ofNamePages: () => {
      throw new Error(`pagesUrl[x:string] x not is equal to: ${Object.values(PagesNamesObj).join(', ')}`)
    },
    ofUpdateType: () => {
      throw new Error('pagesUrl[x:string].update not is typeOf number')
    },
    ofUrlUndefined: () => {
      throw new Error('pagesUrl[x:string].url is undefined')
    },
    ofUrlInvalid: () => {
      throw new Error('pagesUrl[x:string].url is a url invalid')
    },
  }
  const EpisodeNumbers = Object.keys(episodes)
  const checkEpisodeNumbers = EpisodeNumbers.every((checkEpisodeNumber) => !isNaN(parseInt(checkEpisodeNumber)))
  if (!checkEpisodeNumbers) errorMessage.ofEpisodesNumber()
  for (const EpisodeNumber of EpisodeNumbers) {
    const { updateEpisode, pagesUrl } = episodes[EpisodeNumber]
    if (typeof updateEpisode !== 'number') errorMessage.ofUpdateEpisode()
    if (typeof pagesUrl !== 'object') errorMessage.ofPageUrl()

    const Pages = Object.keys(pagesUrl ?? {})
    const checkPagesNames = Pages.every((pageName) => PagesNamesObj[pageName] === pageName)
    if (!checkPagesNames) errorMessage.ofNamePages()

    for (const page of Pages) {
      const { url, update } = pagesUrl![page]!
      if (typeof update !== 'number' || !update) errorMessage.ofUpdateType()
      const urlRegex =
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
      if (typeof url !== 'string' || !url) errorMessage.ofUrlUndefined()
      if (!urlRegex.test(url!)) errorMessage.ofUrlInvalid()
    }
  }

  return true
}

const validateEpisodes = [
  check('episodes').isObject({ strict: true }).custom(checkEpisodesStructure),
  check('id').isNumeric(),
  validateResult,
]

export { validateEpisodes }
