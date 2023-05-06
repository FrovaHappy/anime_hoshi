import { NamePages } from '../Enum'
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
function checkEpisodesStructure(episodes: { [x: string]: Episode }) {
  const EpisodeNumbers = Object.keys(episodes)
  const checkEpisodeNumbers = EpisodeNumbers.every((checkEpisodeNumber) => !isNaN(parseInt(checkEpisodeNumber)))
  if (!checkEpisodeNumbers) throw new Error('"{[x:string]:{}}" x cannot format to number correctly.')
  for (const EpisodeNumber of EpisodeNumbers) {
    const { updateEpisode, pagesUrl } = episodes[EpisodeNumber]
    if (typeof updateEpisode !== 'number')
      throw new Error('Alone episodes[x:string].updateEpisode dont is typeOf number')
    if (typeof pagesUrl !== 'object') throw new Error('Alone episodes[x:string].pagesUrl not is typeof object')
    const Pages = Object.keys(pagesUrl ?? {})
    const checkNamePage = (pageName: string) => {
      return (
        pageName === NamePages.animeFlv ||
        pageName === NamePages.animeblix ||
        pageName === NamePages.jkanime ||
        pageName === NamePages.monosChinos
      )
    }
    const checkPagesNames = Pages.every((pageName) => checkNamePage(pageName))
    if (!checkPagesNames)
      throw new Error(
        `pagesUrl[x:string] no is:  ${NamePages.animeFlv} |  ${NamePages.animeblix} | ${NamePages.jkanime} |  ${NamePages.monosChinos}`
      )
    //TODO: check pagesUrl[x:string] value ... url and update
  }

  return true
}

const validateEpisodes = [check('episodes').isObject({ strict: true }).custom(checkEpisodesStructure), validateResult]

export { validateEpisodes }
