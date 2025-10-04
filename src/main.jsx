import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import './index.css'
import App from './App.jsx'
import About from './About.jsx'

import { AuthProvider, useAuth } from './AuthProvider'
import { supabase } from './supabaseClient'
import AuthCallback from './AuthCallback'

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />
  return children
}

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="about" element={<About />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="protected" element={
          <ProtectedRoute>
            <h1>Protected content</h1>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
