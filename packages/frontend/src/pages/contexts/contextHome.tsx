import type React from 'react'
import { createContext, useContext, useState } from 'react'
import { type AnimeMinified } from '../../../../types/Anime'
import { type UseState } from '../../../types'

interface Props {
  children: React.ReactNode
}
const CreateAnimesContext = createContext<UseState<AnimeMinified[]> | undefined>(undefined)
const CreateAnimeContext = createContext<UseState<AnimeMinified | null> | null>(null)

export function useContextAnime() {
  const context = useContext(CreateAnimeContext)
  if (!context) throw new Error('useIdContext out of context')
  const [animeMinfied, setAnimeMinfied] = context
  return { animeMinfied, setAnimeMinfied }
}
export function useContextAnimes() {
  const context = useContext(CreateAnimesContext)
  if (!context) throw new Error('useAnimesContext out of context')
  const [animesMinfied, setAnimesMinfied] = context
  return { animesMinfied, setAnimesMinfied }
}

export function ContextHome({ children }: Props) {
  const [animesMinfied, setAnimesMinfied] = useState<AnimeMinified[]>([])
  const [animeMinfied, setAnimeMinfied] = useState<AnimeMinified | null>(null)
  return (
    <CreateAnimesContext.Provider value={[animesMinfied, setAnimesMinfied]}>
      <CreateAnimeContext.Provider value={[animeMinfied, setAnimeMinfied]}>{children}</CreateAnimeContext.Provider>
    </CreateAnimesContext.Provider>
  )
}
