import { PagesNames } from '../type'

export const enum IdStatus {
  emty = -1,
}
export const enum EpisodeNumber {
  lastEpisodeNotFound = -1,
}

export const enum TimestampTimings {
  fiveDays = 432_000_000,
  eightHours = 28_800_000,
  fifteenMinutes = 900_000,
}
export const namePages: PagesNames[] = ['animeFlv', 'animeblix', 'crunchyroll', 'jkanime', 'monosChinos']
