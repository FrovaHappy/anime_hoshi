export interface ValidateResult {
  passHTML: boolean
  passTitleSelector: boolean
  passTargetSelector: boolean
  passEpisodeSelector: boolean
  passEpisodePosition: boolean
  passUrlEpisodeSelector: boolean
  timestamp: number
}
export interface ScrapPage {
  namePage: string
  url: string
  targetSelectorAll: string
  episodeSelector: string
  episodePosition: number
  titleSelector: string
  urlEpisodeSelector: string
  remplaceTitle: Array<[searchValue: string, remplaceValue: string]>
  remplaceEpisode: Array<[searchValue: string, remplaceValue: string]>
  validatesResults: ValidateResult[]
}
export interface ScrapEpisode {
  url: string
  title: string
  episode: number
}
export interface Scrap {
  namePage: string
  episodes: ScrapEpisode[]
}
