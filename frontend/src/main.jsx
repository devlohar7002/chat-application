import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RecoilRoot } from 'recoil'
import { SocketContextProvider } from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </RecoilRoot>,
)
