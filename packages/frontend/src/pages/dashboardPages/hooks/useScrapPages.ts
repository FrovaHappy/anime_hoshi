import { useEffect } from 'react'
import { KeysLocalStorage } from '../../../enum'
import { useTokenDashboard } from '../DashboardContext'
import { result } from './mockData'

export default function useScrapPages() {
  const { setPassToken } = useTokenDashboard()
  const token = window.localStorage.getItem(KeysLocalStorage.token)
  useEffect(() => {
    if (token) setPassToken(true)
  }, [])
  return result
}
