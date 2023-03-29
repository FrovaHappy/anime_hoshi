import { createContext, useContext, useState } from 'react'
import { AnimeList } from '../../../../types'

type Props = {
  children: any
}
type AnimesContext =
  | {
      animes: AnimeList[] | undefined
      setAnimes: React.Dispatch<React.SetStateAction<AnimeList[] | undefined>>
    }
  | undefined
type AnimeContext =
  | {
      anime: AnimeList | undefined
      setAnime: React.Dispatch<React.SetStateAction<AnimeList | undefined>>
    }
  | undefined

const CreateAnimesContext = createContext<AnimesContext>(undefined)
const CreateAnimeContext = createContext<AnimeContext>(undefined)

export function useAnimeContext() {
  const context = useContext(CreateAnimeContext)
  if (!context) throw new Error('useIdContext out of context')
  return context
}
export function useAnimesContext() {
  const context = useContext(CreateAnimesContext)
  if (!context) throw new Error('useAnimesContext out of context')
  return context
}

export function ContextHome({ children }: Props) {
  const [animes, setAnimes] = useState<AnimeList[]>()
  const [anime, setAnime] = useState<AnimeList>()
  return (
    <CreateAnimesContext.Provider value={{ animes, setAnimes }}>
      <CreateAnimeContext.Provider
        value={{
          anime,
          setAnime,
        }}
      >
        {children}
      </CreateAnimeContext.Provider>
    </CreateAnimesContext.Provider>
  )
}
