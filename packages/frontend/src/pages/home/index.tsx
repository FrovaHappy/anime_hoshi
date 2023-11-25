import { ContextHome } from '../contexts/contextHome'
import RenderList from './components/renderList'
import './index.scss'
import Info from './components/Info'
import Nav from './Nav'
import { useState } from 'react'
import type { AnimeMinified } from '../../../../types/Anime'
import Slider from './Slider'
export default function Home() {
  const [filter, setFilter] = useState<AnimeMinified[] | null>(null)
  return (
    <ContextHome>
      <div className='home'>
        <Nav setFilter={setFilter} />
        <Slider />
        <RenderList filter={filter} />
        <Info />
      </div>
    </ContextHome>
  )
}
