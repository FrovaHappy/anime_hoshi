import './styles/App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import User from './pages/user'
import Nav from './Nav'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={'log'} element={<div>log</div>} />
          <Route path={'user'} element={<User />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
