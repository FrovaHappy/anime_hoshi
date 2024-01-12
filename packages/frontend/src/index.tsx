import ReactDOM from 'react-dom/client'
import './styles/index.css'
import App from './App'
import { StrictMode } from 'react'
import { Analytics } from '@vercel/analytics/react'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>
)
