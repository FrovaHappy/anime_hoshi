import { ContextHome } from '../contexts/contextHome'
import RenderInfo from './components/renderInfo'
import RenderList from './renderList'

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
