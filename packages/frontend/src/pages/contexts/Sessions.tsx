import { createContext, useContext, useState } from 'react'
import { type UseState } from '../../../types'
export const enum ComponentType {
  children = 'children',
  signin = 'signin',
  signup = 'signup',
}

const ShowComponentContext = createContext<UseState<ComponentType> | undefined>(undefined)
export function useShowComponent() {
  const context = useContext(ShowComponentContext)
  if (!context) throw new Error('showComponentContext out of context')
  const [showComponent, setShowComponent] = context
  return { showComponent, setShowComponent }
}

function Sessiones({ children }: { children: React.ReactNode }) {
  const [showComponent, setShowComponent] = useState<ComponentType>(ComponentType.children)
  return (
    <ShowComponentContext.Provider value={[showComponent, setShowComponent]}>{children}</ShowComponentContext.Provider>
  )
}

export default Sessiones
