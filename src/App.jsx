import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient'
import { AuthProvider, useAuth } from './AuthProvider'

import './App.css';

function App() {
    const signInWithGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: `${window.location.origin}/auth/callback` }
        })
    }

    const signOut = async () => {
        await supabase.auth.signOut()
    }

    const { user } = useAuth();

    return (
        <div>
            <h1>home page!!!</h1>
            <Link to="/about">aaa</Link>

            {user ? (
                <>
                    <p>Signed in as {user.email}</p>
                    <button onClick={signOut}>Sign out</button>
                </>
            ) : (
                <>
                    <p>Not signed in</p>
                    <button onClick={signInWithGoogle}>Sign in with google</button>
                </>
            )}
        </div>   
    )
}

export default App;