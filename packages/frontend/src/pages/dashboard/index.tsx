import DashboardComponent, { useTokenDashboard } from './DashboardContext'
import { ScrapPagesModule } from './ScrapPagesModule'

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
