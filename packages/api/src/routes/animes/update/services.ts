import { Anime, Episodes } from '../../../../../types/Anime'
import animeDb from '../../../database/anime.db'
import fetchAnilist, { SearchOptions } from '../../../shared/fetchAnilist'
import { UpdateAnimeBodyType } from './validatorSchema'
async function saveRedirectId(putAnime: UpdateAnimeBodyType) {
  let anime = await animeDb.findOne({ search: `${putAnime.id}`, searchType: 'id', namePage: '' })
  if (!anime) return null
  let pages = anime.pages
  let page = pages[putAnime.namePage]

  page.redirectId = putAnime.redirectId!

  pages[putAnime.namePage] = page
  anime.pages = pages

  return await animeDb.updateOne({ anime: anime, filter: { 'dataAnilist.id': anime.dataAnilist.id } })
}
async function createNewAnime(putAnime: UpdateAnimeBodyType) {
  const dataAnilist = await fetchAnilist({ search: putAnime.redirectId!, searchType: SearchOptions.forId })
  if (!dataAnilist) return null
  const redirectIdSaved = await saveRedirectId(putAnime)
  if (!redirectIdSaved) return null
  const episodes = putAnime.episodes?.map((episode) => {
    return {
      episode: episode.newEpisode ?? episode.oldEpisode,
      link: episode.link,
      lastUpdate: Date.now(),
    }
  })
  let newAnime: Anime = {
    dataAnilist: dataAnilist,
    lastUpdate: Date.now(),
    pages: {
      [putAnime.namePage]: {
        episodes: episodes ?? [],
        title: putAnime.title,
        redirectId: 0,
        startCount: putAnime.startCount ?? 0,
        lastUpdate: Date.now(),
      },
    },
  }
  return await animeDb.updateOne({ anime: newAnime, filter: { 'dataAnilist.id': dataAnilist.id } })
}

async function updateAnime(anime: Anime, putAnime: UpdateAnimeBodyType) {
  let pages = anime.pages ?? {}
  let page = pages[putAnime.namePage]

  page.lastUpdate = putAnime.lastUpdate ? page.lastUpdate : Date.now()
  page.startCount = putAnime.startCount ?? page.startCount
  page.title = putAnime.title

  let newEpisodes: Episodes = []
  let oldEpisodes = page.episodes
  putAnime.episodes?.forEach((episode, i) => {
    const existEp = page.episodes.find((ep) => ep.episode === episode.oldEpisode)
    let newEp = {
      episode: episode.newEpisode ?? episode.oldEpisode,
      link: episode.link,
      lastUpdate: Date.now(),
    }
    if (!existEp) {
      newEpisodes.push(newEp)
    } else {
      newEp.lastUpdate = episode.lastUpdate ? newEp.lastUpdate : existEp.lastUpdate
      oldEpisodes[i] = newEp
    }
  })
  page.episodes = [...newEpisodes, ...oldEpisodes].sort((a, b) => b.episode - a.episode)

  pages[putAnime.namePage] = page
  anime.pages = pages
  return await animeDb.updateOne({ anime: anime, filter: { 'dataAnilist.id': anime.dataAnilist.id } })
}
export async function createRedirectId(putAnime: UpdateAnimeBodyType) {
  let animeRedirect = await animeDb.findOne({ search: `${putAnime.redirectId}`, searchType: 'id', namePage: '' })
  if (!animeRedirect) return await createNewAnime(putAnime)
  return await updateAnime(animeRedirect, putAnime)
}
export async function updateGeneral(putAnime: UpdateAnimeBodyType) {
  let findId = await animeDb.findOne({ search: `${putAnime.id}`, searchType: 'id', namePage: '' })
  if (!findId) return null
  return await updateAnime(findId, putAnime)
}
