import { ContextHome } from '../contexts/contextHome'
import RenderInfo from './components/renderInfo'
import RenderList from './components/renderList'

export default function Home() {
  return (
    <ContextHome>
      <>
        <RenderList />
        <RenderInfo />
      </>
    </ContextHome>
  )
}
