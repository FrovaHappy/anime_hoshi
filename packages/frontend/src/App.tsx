import './styles/App.scss'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import Settings from './pages/settings'
import DashboardPages from './pages/dashboard/Pages'
import DashboardLogs from './pages/dashboard/Logs'
import Dashboard from './pages/dashboard'
import DashboardAnimes from './pages/dashboard/animesEditor'
import SignIn from './pages/session/signIn'
import SignUp from './pages/session/signUp'
import { getTheme } from './utils/toggleTheme'
function App() {
  getTheme()
  return (
    <BrowserRouter>
      <div className='App'>
        <span className='app__bg'>
          <span className='app__bg--back' />
          <span className='app__bg--front' />
        </span>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path={'setting'} element={<Settings />} />
          <Route path='dashboard'>
            <Route path='' element={<Dashboard />} />
            <Route path='pages' element={<DashboardPages />} />
            <Route path='logs' element={<DashboardLogs />} />
            <Route path='animes' element={<DashboardAnimes />} />
          </Route>
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
