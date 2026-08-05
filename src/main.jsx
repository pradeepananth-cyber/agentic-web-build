import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AgentWeb from './agent-driven-web-delivery-pitch.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AgentWeb />
  </StrictMode>,
)
