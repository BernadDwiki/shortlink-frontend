import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css';
import { AuthProvider } from './context/AuthContext.jsx';
import AppRouter from './AppRouter.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>,
)