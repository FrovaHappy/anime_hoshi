import './styles/App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import User from './pages/user'
import Dashboard from './pages/dashboard'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path={'setting'} element={<User />} />
          <Route path='dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
