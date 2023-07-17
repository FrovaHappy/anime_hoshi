import Log from './log'
import { type DataAnilist } from '../../../types/dataAnilist'
type Params = { search: string | number; searchType: SearchOptions }
export enum SearchOptions {
  forTitle = 'forTitle',
  forId = 'forId',
}
const query = ({ query, media }: { query: string; media: string }) => `
  query(${query}){
    Media(${media}, type: ANIME) {
      id
      episodes
      status
      format
      description
      averageScore
      duration
      coverImage {
        large
        medium
        color
      }
      title {
        romaji
        english
        native
        userPreferred
      }
    }
  }`

const searchOptions: { [x: string]: { query: string; variables: (search: string | number) => object } } = {
  [SearchOptions.forTitle]: {
    query: query({ query: '$search: String', media: 'search: $search' }),
    variables: (search: string | number) => {
      return { search: search }
    },
  },
  [SearchOptions.forId]: {
    query: query({ query: '$id: Int', media: 'id: $id' }),
    variables: (search: string | number) => {
      return { id: search }
    },
  },
}

async function queryAnilist({ searchType, search }: Params) {
  const url = 'https://graphql.anilist.co'
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: searchOptions[searchType].query,
      variables: searchOptions[searchType].variables(search),
    }),
  }
  return await fetch(url, options)
    .then((response) => response.json())
    .catch((e) => {
      Log({ message: 'Error in fetch', type: 'error', content: { error: e, searchType, search } })
      return null
    })
}
export default async function Main({ search, searchType }: Params) {
  const response = await queryAnilist({ search, searchType })
  if (response === null) null
  if (response.errors) {
    Log({
      message: '[anilist] Error in Query',
      type: 'warning',
      content: { errors: response.errors, searchType, search },
    })
    return null
  }
  const data: DataAnilist = response.data.Media
  data.lastUpdate = Date.now()
  return data
}
