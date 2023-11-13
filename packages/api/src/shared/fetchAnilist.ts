import logger from './log'
import { type DataAnilist } from '../../../types/dataAnilist'
interface Params {
  search: string | number
  searchType: SearchOptions
}
export enum SearchOptions {
  forTitle = 'forTitle',
  forId = 'forId'
}
interface Query {
  query: string
  media: string
}
const query = ({ query, media }: Query) => `
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

interface SchemaSearchOptions {
  query: string
  variables: (search: string | number) => object
}
const searchOptions: Record<string, SchemaSearchOptions> = {
  [SearchOptions.forTitle]: {
    query: query({ query: '$search: String', media: 'search: $search' }),
    variables: search => {
      return { search }
    }
  },
  [SearchOptions.forId]: {
    query: query({ query: '$id: Int', media: 'id: $id' }),
    variables: search => {
      return { id: search }
    }
  }
}

async function queryAnilist({ searchType, search }: Params) {
  const url = 'https://graphql.anilist.co'
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query: searchOptions[searchType].query,
      variables: searchOptions[searchType].variables(search)
    })
  }
  return await fetch(url, options)
    .then(async response => await response.json())
    .catch(async e => {
      await logger.error({
        message: 'Error in fetch',
        section: 'query Anilist',
        content: { error: e, searchType, search }
      })
      return null
    })
}
export default async function Main({ search, searchType }: Params) {
  const response = await queryAnilist({ search, searchType })
  if (response === null) return null
  if (response.errors) {
    await logger.warn({
      message: 'Error in Query',
      content: { errors: response.errors, searchType, search },
      section: 'query Anilist'
    })
    return null
  }
  const data: DataAnilist = response.data.Media
  data.lastUpdate = Date.now()
  return data
}
