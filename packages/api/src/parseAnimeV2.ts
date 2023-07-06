import { Anime } from '../../types/Anime'
import { animeModel } from './database/models/anime.model'

type Status = 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED' | 'CANCELLED' | 'HIATUS'
type Format = 'MUSIC' | 'ONA' | 'OVA' | 'SPECIAL' | 'MOVIE' | 'TV_SHORT' | 'TV'
export interface CoverImage {
  large: string
  medium: string
  color: string
}
export interface DataAnilist {
  id: number
  episodes: number | null
  status?: Status
  format?: Format
  description?: string
  averageScore?: number
  duration?: number
  coverImage: CoverImage
  title: Title
}
export interface Title {
  romaji: string
  english: string
  native: string
  userPreferred: string
}
export interface Episodes {
  [key: string]: EpisodesContent | undefined
}
export interface EpisodesContent {
  updateEpisode: number
  pagesUrl: PagesUrlObject
}
interface KeyDinamicString {
  [key: string]: string | undefined
}
export interface PagesUrlObject {
  [key: string]: {
    url: string
    update: number
  }
}
export interface AnimeList {
  updateAnilist: number
  dataAnilist: DataAnilist
  episodes: Episodes
  titleinPages: KeyDinamicString
  lastEpisodesOfTempPreview?: number
  id: number
}

//==============| PARSE CODE |================================
export default async function parse() {
  const queryAnimes: AnimeList[] = await animeModel.find({})
  const oldAnimes = JSON.parse(JSON.stringify(queryAnimes))
  for (const oldAnime of oldAnimes) {
    let canUpdate = false
    // remove oldDataAnilist for the current
    const oldDataAnilist = oldAnime.dataAnilist
    let newAnime = {} as Anime

    if (Boolean(oldAnime.updateAnilist)) {
      canUpdate = true
      newAnime.dataAnilist = {
        description: oldDataAnilist.description ?? null,
        duration: oldDataAnilist.duration ?? null,
        averageScore: oldDataAnilist.averageScore ?? null,
        coverImage: oldDataAnilist.coverImage,
        episodes: oldDataAnilist.episodes,
        format: oldDataAnilist.format ?? 'UNKNOWN',
        id: oldDataAnilist.id,
        lastUpdate: oldAnime.updateAnilist,
        status: 'UNKNOWN',
        title: oldDataAnilist.title,
      }
    } else {
      newAnime.dataAnilist = { ...oldDataAnilist }
    }
    // consturyendo pages
    if (Boolean(oldAnime.episodes)) {
      canUpdate = true
      const oldEpisodesKey = Object.keys(oldAnime.episodes)

      for (const epKey of oldEpisodesKey) {
        let maxTimestamp = 0
        const compareTimestamp = (timestamp: number) => {
          if (timestamp > maxTimestamp) maxTimestamp = timestamp
          return maxTimestamp
        }
        const episode = oldAnime.episodes[epKey]!
        const urlPageKey = Object.keys(episode.pagesUrl)
        for (const uPKey of urlPageKey) {
          let newEpisode = {
            link: episode.pagesUrl[uPKey].url,
            episode: parseInt(epKey ?? '0') ?? 0,
            lastUpdate: episode.pagesUrl[uPKey].update,
          }
          let beforePages = newAnime.pages ?? {}
          const beforeEpisodes = beforePages[uPKey]?.episodes ?? []
          let newPage = {
            startCount: 1,
            title: oldAnime.titleinPages[uPKey],
            lastUpdate: compareTimestamp(episode.updateEpisode), // controlar el tiempo
            redirectId: null,
            episodes: [...beforeEpisodes, newEpisode],
          }
          beforePages[uPKey] = newPage

          newAnime.pages = beforePages
        }
        const timestamp = newAnime.lastUpdate ?? 0
        newAnime.lastUpdate = timestamp > maxTimestamp ? timestamp : maxTimestamp
      }
    } else {
      newAnime.lastUpdate = oldAnime.lastUpdate ?? Date.now()
      newAnime.pages = oldAnime.pages ?? {}
    }
    if (canUpdate)
      await animeModel
        .findOneAndUpdate({ 'dataAnilist.id': newAnime.dataAnilist.id }, newAnime, {
          overwrite: true,
          runValidators: true,
        })
        .then((anime) => console.log(`Updated  ${anime?.dataAnilist.id}`))
        .catch((error) => {
          throw new Error(`error in ${newAnime.dataAnilist.id} \n ->` + error)
        })
  }
}
