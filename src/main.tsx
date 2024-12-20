import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Importation des styles globaux
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)