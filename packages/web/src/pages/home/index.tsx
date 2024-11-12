import { ContextHome } from './contextHome'
import RenderList from './components/renderList'
import './index.scss'
import Info from './components/Info'
import Nav from './Nav'
import { useState } from 'react'
import type { AnimeMinified } from '../../../../types/Anime'
import Warding from "../../components/Warding";
import MoreInfo from "../../components/MoreInfo";
export default function Home() {
  const [filter, setFilter] = useState<AnimeMinified[] | null>(null)

  return (
			<div className="home">
				<ContextHome>
					<Nav setFilter={setFilter} />
					<Warding />
					<MoreInfo />
					<RenderList filter={filter} />
					<Info />
				</ContextHome>
			</div>
		);
}
