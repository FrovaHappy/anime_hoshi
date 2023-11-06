import './styles/App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import User from './pages/user'
import DashboardPages from './pages/dashboardPages'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path={'setting'} element={<User />} />
          <Route path='dashboard'>
            <Route
              path=''
              element={
                <>
                  <div>dashboard</div>
                </>
              }
            />
            <Route path='pages' element={<DashboardPages />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
