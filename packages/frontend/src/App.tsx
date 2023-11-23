import './styles/App.scss'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import User from './pages/user'
import DashboardPages from './pages/dashboardPages'
import DashboardLogs from './pages/dashboardLogs'
import Nav from './pages/shared/Nav'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <span className='app__bg'>
          <span className='app__bg--back' />
          <span className='app__bg--front' />
        </span>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path={'setting'} element={<User />} />
          <Route path='dashboard'>
            <Route
              path=''
              element={
                <>
                  <Nav />
                  <div>dashboard</div>
                </>
              }
            />
            <Route path='pages' element={<DashboardPages />} />
            <Route path='logs' element={<DashboardLogs />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
