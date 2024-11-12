import type React from 'react'
import { createContext, useContext, useState, useMemo } from 'react'
import type { AnimeMinified } from "../../../../types/Anime";
import type { UseState } from "../../../types";
import { getIdLocation } from '../../utils/getIdLocation'

interface Props {
  children: React.ReactNode
}

const CreateAnimesContext = createContext<UseState<AnimeMinified[]> | undefined>(undefined)
const CreateIdContext = createContext<UseState<number | null> | undefined>(undefined)

export function useIdContext() {
  const context = useContext(CreateIdContext)
  if (!context) throw new Error('useIdContext out of context')
  const [id, setId] = context
  return { id, setId }
}
export function useContextAnimes() {
  const context = useContext(CreateAnimesContext)
  if (!context) throw new Error('useAnimesContext out of context')
  const [animesMinfied, setAnimesMinfied] = context
  return { animesMinfied, setAnimesMinfied }
}

export function ContextHome({ children }: Props) {
  const [animesMinfied, setAnimesMinfied] = useState<AnimeMinified[]>([])
  const [id, setId] = useState<number | null>(getIdLocation())

  // se memoriza los valores de los context para evitar reenderizaciones
  const animeValue: [AnimeMinified[], (key: AnimeMinified[]) => void] = useMemo(
    () => [animesMinfied, setAnimesMinfied],
    [animesMinfied]
  )

  const idContext: [number | null, (key: number | null) => void] = useMemo(() => [id, setId], [id])

  return (
    <CreateAnimesContext.Provider value={animeValue}>
      <CreateIdContext.Provider value={idContext}>{children}</CreateIdContext.Provider>
    </CreateAnimesContext.Provider>
  )
}
