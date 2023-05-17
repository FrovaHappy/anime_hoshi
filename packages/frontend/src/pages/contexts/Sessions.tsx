import { createContext, useContext, useState } from 'react'
export const enum ComponentType {
  children = 'children',
  signin = 'signin',
  signup = 'signup',
}
type StateComponent<T> = {
  [x: string]: T | ((v: T) => void)
}
const ShowComponentContext = createContext<StateComponent<ComponentType> | undefined>(undefined)
export function useShowComponent() {
  const context = useContext(ShowComponentContext)
  console.log(context)
  if (!context) throw new Error('showComponentContext out of context')
  const showComponent = context.showComponent as ComponentType
  const setShowComponent = context['setShowComponent'] as (v: ComponentType) => void
  return { showComponent, setShowComponent }
}

function Sessiones({ children }: { children: React.ReactNode }) {
  const [showComponent, setShowComponent] = useState<ComponentType>(ComponentType.children)
  return (
    <ShowComponentContext.Provider value={{ showComponent, setShowComponent }}>
      {children}
    </ShowComponentContext.Provider>
  )
}

export default Sessiones
