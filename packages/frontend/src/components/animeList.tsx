import { useEffect, useState } from 'react'
import { AnimeEdited } from '../../../types'
import '../styles/animeList.scss'

export function AnimeList() {
  const [animeList, SetAnimelist] = useState<AnimeEdited[]>([])

  const query = async () => {
    const data = await fetch('/anime')
    const animelist = await data.json()
    SetAnimelist(animelist.reverse())
  }

  useEffect(() => {
    query()
  }, [])

  return (
    <div className="animeList">
      {animeList.map((animeEdited) => {
        return (
          <div className="targetAnime" key={animeEdited.data.id}>
            <img
              className="targetAnime__img"
              src={animeEdited.data.coverImage.large}
              alt={animeEdited.data.title.romaji}
            />
            <h5 className="targetAnime__title">{animeEdited.data.title.romaji}</h5>
          </div>
        )
      })}
    </div>
  )
}
