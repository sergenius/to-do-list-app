import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { STORAGE_KEYS } from './utils/constants'
import { getBooleanFromStorage } from './utils/storage'

if (getBooleanFromStorage(STORAGE_KEYS.DARK_MODE, false)) {
  document.documentElement.classList.add('dark')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
