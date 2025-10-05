import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import './index.css'
import Home from './pages/Home.jsx'
import Discovery from './pages/Discovery.jsx'
import Nav from './components/Nav.jsx'

import { AuthProvider, useAuth } from './auth/AuthProvider.jsx'
import { supabase } from './supabaseClient'
import AuthCallback from './auth/AuthCallback.jsx'
import CreateEvent from './pages/CreateEvent.jsx'

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />
  return children
}

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eventcreate" element={<CreateEvent />} />
        <Route path="/discovery" element={<Discovery />} />
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
