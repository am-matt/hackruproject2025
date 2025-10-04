import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

export default function AuthCallback(){
  const navigate = useNavigate()

  useEffect(() => {
    async function handle() {
      try {
        // Some versions/flows need parsing the URL to store the session.
        // If getSessionFromUrl exists, it can store the session from query/hash.
        if (typeof supabase.auth.getSessionFromUrl === 'function') {
          // storeSession: true is important in older versions/edge-cases
          await supabase.auth.getSessionFromUrl({ storeSession: true })
        }
      } catch (err) {
        // ignore; session may already be stored via onAuthStateChange
        console.error('callback parse error (safe to ignore):', err)
      }

      // onAuthStateChange (in AuthProvider) should update session; navigate home
      navigate('/')
    }

    handle()
  }, [navigate])

  return <div>Signing you in…</div>;
}
