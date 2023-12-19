export interface ValidateResult {
  passHTML: boolean
  passTitleSelector: boolean
  passTargetSelector: boolean
  passEpisodeSelector: boolean
  passEpisodePosition: boolean
  passUrlEpisodeSelector: boolean
  passLangSelector: boolean
  timestamp: number
}
export type LangSupport = 'ES' | 'EN' | 'JP'
export interface LangCases {
  find: string
  lang: LangSupport
}
export interface ScrapPage {
  namePage: string
  url: string
  targetSelectorAll: string
  episodeSelector: string
  episodePosition: number
  titleSelector: string
  urlEpisodeSelector: string
  langSelector: string
  langsCases: LangCases[]
  defaultLang: LangSupport
  remplaceTitle: Array<[searchValue: string, remplaceValue: string]>
  remplaceEpisode: Array<[searchValue: string, remplaceValue: string]>
  validatesResults: ValidateResult[]
}
export interface ScrapEpisode {
  url: string
  title: string
  episode: number
  lang: LangSupport
}
export interface Scrap {
  namePage: string
  episodes: ScrapEpisode[]
}
export interface EpisodeError extends ScrapEpisode {
  timestamp: number
  namePage: string
  isOpen: boolean
  errorCapture: string
}
