import DashboardComponent, { useTokenDashboard } from './DashboardContext'
import StatusLine from './components/StatusLine'
import useScrapPages from './hooks/useScrapPages'

function ScrapPagesModule() {
  const scrapPages = useScrapPages()

  return (
    <>
      ass{' '}
      {scrapPages.map((scrapPage, i) => {
        return <StatusLine key={i} scrapPage={scrapPage} />
      })}
    </>
  )
}

function Main() {
  const { passToken } = useTokenDashboard()
  if (!passToken) return <>inicia sesión antes de continuar</>

  return (
    <>
      <ScrapPagesModule />
    </>
  )
}

export default function Index() {
  return (
    <DashboardComponent>
      <Main />
    </DashboardComponent>
  )
}
