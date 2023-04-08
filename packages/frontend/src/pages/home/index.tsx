import { ContextHome } from '../contexts/contextHome'
import RenderInfo from './components/renderInfo'
import RenderList from './components/renderList'
import './index.scss'
export default function Home() {
  return (
    <ContextHome>
      <div className="home">
        <RenderList />
        <RenderInfo />
      </div>
    </ContextHome>
  )
}
