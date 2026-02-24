import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { OrderProvider } from './context/OrderContext'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <OrderProvider>
        <App />
      </OrderProvider>
    </HashRouter>
  </React.StrictMode>
)
