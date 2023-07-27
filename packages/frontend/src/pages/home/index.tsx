import { ContextHome } from '../contexts/contextHome'
import RenderInfo from './components/renderInfo'
import Menu from '../contexts/Menu'
import RenderList from './components/renderList'
import './index.scss'
export default function Home() {
  return (
    <ContextHome>
      <div className="home">
        <RenderList />
        <Menu>
          <RenderInfo />
        </Menu>
      </div>
    </ContextHome>
  )
}
