import { ContextHome } from '../contexts/contextHome'
import RenderList from './components/renderList'
import './index.scss'
import Info from './components/Info'
export default function Home() {
  return (
    <ContextHome>
      <div className='home'>
        <RenderList />
        <Info />
      </div>
    </ContextHome>
  )
}
