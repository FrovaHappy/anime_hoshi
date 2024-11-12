import type React from 'react'
import { createContext, useContext, useState } from 'react'
import { type UseState } from '../../../../types'

const DashboardContext = createContext<UseState<boolean> | undefined>(undefined)

export function useTokenDashboard() {
  const context = useContext(DashboardContext)
  if (!context) throw new Error('showComponentContext out of context')
  const [passToken, setPassToken] = context
  return { passToken, setPassToken }
}
export default function Index({ children }: React.PropsWithChildren) {
  const [passToken, setPassToken] = useState(true)
  return <DashboardContext.Provider value={[passToken, setPassToken]}>{children}</DashboardContext.Provider>
}
