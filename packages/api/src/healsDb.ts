import { type Pages, type Anime } from '../../types/Anime'
import { type DataAnilist } from '../../types/dataAnilist'
import { animeModel } from './database/models/anime.model'
import { copyDeepObject } from './utils/general'

export default async function animeDbHeals() {
  const animes: any[] = await animeModel.find({})
  const result = {
    total: animes.length,
    updated: 0,
    passed: 0
  }
  for await (let anime of animes) {
    anime = copyDeepObject(anime)
    result.passed += 1
    const dataAnilist: DataAnilist = anime.dataAnilist
    if (!dataAnilist) continue
    result.updated += 1
    const namePages = Object.keys(anime.pages as object)
    const pages: Pages = {}
    const titles: string[] = []
    for (const namePage of namePages) {
      const pageOld = anime.pages[namePage]
      titles.push(pageOld.title as string)
      pages[namePage] = {
        episodes: pageOld.episodes,
        lang: 'JS',
        lastUpdate: pageOld.lastUpdate,
        namePage,
        redirectId: pageOld.redirectId,
        startCount: pageOld.startCount
      }
    }

    const animeNew: Anime = {
      pages,
      titles: [...new Set(titles)],
      averageScore: dataAnilist.averageScore,
      coverImage: {
        color: dataAnilist.coverImage.color,
        large: dataAnilist.coverImage.large,
        medium: dataAnilist.coverImage.medium
      },
      description: dataAnilist.description,
      duration: dataAnilist.duration,
      episodes: dataAnilist.episodes,
      format: dataAnilist.format,
      id: dataAnilist.id,
      lastUpdate: dataAnilist.lastUpdate,
      status: dataAnilist.status,
      title: {
        english: dataAnilist.title.english,
        native: dataAnilist.title.native,
        romaji: dataAnilist.title.romaji,
        userPreferred: dataAnilist.title.userPreferred
      }
    }
    await animeModel.findOneAndRemove({ 'dataAnilist.id': animeNew.id })
    await animeModel.findOneAndUpdate({ id: animeNew.id }, animeNew, { upsert: true })
  }
  console.table(result)
}
