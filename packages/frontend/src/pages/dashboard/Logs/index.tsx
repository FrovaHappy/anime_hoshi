import Nav from '../Nav'
import LogPanel from './logPanel'

export default function Index() {
  return (
    <main className='mainContainer'>
      <Nav routeActive='logs' />
      <LogPanel />
    </main>
  )
}
