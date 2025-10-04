import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

const AuthContext = createContext({session:null,user:null})

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(()=>{
        let mounted = true

        supabase.auth.getSession().then(({ data }) => {
            if (!mounted) return
            setSession(data.session ?? null);
            setUser(data.session?.user ?? null)
        })

        const {data: { subscription } } = supabase.auth.onAuthStateChange((_event,session)=>{
            setSession(session)
            setUser(session?.user ?? null)
        })

        return () => {
            mounted = false
            subscription.unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ session, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)