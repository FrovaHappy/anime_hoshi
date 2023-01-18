import { QueryAnilist } from '../../../../types'

export async function queryAnilistForTitle(searchForTitle: string): Promise<QueryAnilist> {
  const query = `
  query($search: String){
    Media(search: $search, type: ANIME) {
      id
      episodes
      format
      status
      coverImage {
        large
        medium
        color
      }
      nextAiringEpisode {
        airingAt
        episode
      }
      title {
        romaji
        english
        native
      }
    }
  }`
  const url = 'https://graphql.anilist.co'
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: {
        search: searchForTitle,
      },
    }),
  }
  return await fetch(url, options)
    .then((response) => response.json())
    .catch((err) => console.log(err))
}
