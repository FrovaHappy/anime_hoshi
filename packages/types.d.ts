export interface InfoEpisodeRecovered {
  url: string
  title: string
  episode: number
}

export interface DataAnilist {
  id: number
  episodes: number | null
  format: string
  status: string
  coverImage: CoverImage
  nextAiringEpisode: NextAiringEpisode | null
  title: Title
}

export interface CoverImage {
  large: string
  medium: string
  color: string
}

export interface NextAiringEpisode {
  airingAt: number
  episode: number
}

export interface Title {
  romaji: string
  english: string
  native: string
}

export interface Anime {
  data: DataAnilist
}

export type EpisodesInPage = {
  url: string
  episode: number
}

export interface PageScrapped {
  nameOfPage: string
  title: string
  episodes: EpisodesInPage[]
}
export interface QueryAnilist {
  data: {
    Media: DataAnilist
  } | null
}

export interface AnimeEdited extends Anime {
  pages: PageScrapped[]
}

export interface TopList {
  animePublished: number[]
}
