import { InfoEpisodeRecovered, PagesAttacked } from '../../../../types'
import searchAnime from './searchAnime'

async function validateData({ namePage, animesScrap }: { namePage: string; animesScrap: InfoEpisodeRecovered[] }) {
  for (const animeScrap of animesScrap) {
    await searchAnime({ title: animeScrap.title, namePage })
  }
}

export default async function index(pagesAttacked: PagesAttacked) {
  for (let pageScrap of pagesAttacked) {
    const namePage = Object.keys(pageScrap)[0]
    const animesScrap = pageScrap[namePage]
    await validateData({ namePage, animesScrap })
  }
}
