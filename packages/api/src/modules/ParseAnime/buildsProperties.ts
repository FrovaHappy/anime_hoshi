import { type Anime } from '../../../../types/Anime'
import { type LangSupport } from '../../../../types/ScrapEpisode'
import { TimestampTimings } from '../../Enum'
import fetchAnilist from '../../shared/fetchAnilist'
import { copyDeepObject } from '../../utils/general'

interface BuildPages {
  anime: Anime
  namePage: string
  lang: LangSupport
  defaultLang: LangSupport
}
export function buildPages({ anime, namePage, lang, defaultLang }: BuildPages) {
  const animeCopy = copyDeepObject(anime)
  const namePageStr = lang === defaultLang ? namePage : namePage + lang
  const page = anime.pages[namePageStr]
  if (page) return anime

  animeCopy.pages[namePageStr] = {
    episodes: [],
    redirectId: null,
    lastUpdate: 0,
    namePage,
    lang,
    startCount: 0
  }
  return animeCopy
}

export async function updateAnilist(anime: Anime) {
  const animeCopy = copyDeepObject(anime)
  const hasUpdate = anime.lastUpdate + TimestampTimings.fiveDays < Date.now()
  if (!hasUpdate) return anime
  const dataAnilist = await fetchAnilist({ search: anime.id, searchType: 'forId' })
  return { ...animeCopy, ...dataAnilist }
}
