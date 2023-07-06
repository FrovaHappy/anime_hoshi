type Status = 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED' | 'CANCELLED' | 'HIATUS' | 'UNKNOWN'
type Format = 'MUSIC' | 'ONA' | 'OVA' | 'SPECIAL' | 'MOVIE' | 'TV_SHORT' | 'TV' | 'UNKNOWN'
export type DataAnilist = {
  id: number
  lastUpdate: number //TODO: add this
  episodes: number | null
  status: Status // TODO: put this in Unknown
  format: Format // TODO: put this in Unknown
  description: string | null // TODO: add description to eveyone
  averageScore: number | null // TODO: verify the null value
  duration: number | null // TODO: verify the null value
  coverImage: CoverImage
  title: Title
}
export interface CoverImage {
  large: string
  medium: string
  color: string
}
export interface Title {
  romaji: string
  english: string | null
  native: string
  userPreferred: string
}
