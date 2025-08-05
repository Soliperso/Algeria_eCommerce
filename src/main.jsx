import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initializeConfig } from './config/environment.js'

// Initialize configuration and validate environment variables
try {
  initializeConfig();
} catch (error) {
  console.error('Failed to initialize application:', error);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
