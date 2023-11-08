import { ContextHome } from '../contexts/contextHome'
import RenderList from './components/renderList'
import './index.scss'
import Info from './components/Info'
import Nav from './Nav'
export default function Home() {
  return (
    <ContextHome>
      <div className='home'>
        <Nav />
        <RenderList />
        <Info />
      </div>
    </ContextHome>
  )
}
