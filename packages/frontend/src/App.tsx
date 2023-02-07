import './styles/App.css'
import { AnimeComponet } from './components/animeList'
import { useEffect, useState } from 'react'
import { AnimeList } from '../../types'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { AnimeInfo } from './components/animeInfo'
import { urlApi } from './config'

function App() {
  const [animeList, SetAnimelist] = useState<AnimeList[]>([])

  const query = async () => {
    const data = await fetch(`${urlApi}/animes`)
      .then((response) => response.json())
      .catch(() => [])
    const animelist = await data
    SetAnimelist(animelist.reverse())
  }

  useEffect(() => {
    query()
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <AnimeComponet animes={animeList} />
        <Routes>
          <Route path={'/'} element={<AnimeInfo animeList={animeList} />} />
          <Route path={'/:id'} element={<AnimeInfo animeList={animeList} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
