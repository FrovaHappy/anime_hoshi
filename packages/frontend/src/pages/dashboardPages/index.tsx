import DashboardComponent, { useTokenDashboard } from './DashboardContext'
import EpisodeLogs from './EpisodesLogs'
import Nav from './Nav'
import { ScrapPagesModule } from './ScrapPagesModule'

import './index.scss'

function Main() {
  const { passToken } = useTokenDashboard()
  if (!passToken) return <>inicia sesión antes de continuar</>

  return (
    <main className='dashboardScraping'>
      <Nav />
      <EpisodeLogs />
      <ScrapPagesModule />
    </main>
  )
}

export default function Index() {
  return (
    <DashboardComponent>
      <Main />
    </DashboardComponent>
  )
}
