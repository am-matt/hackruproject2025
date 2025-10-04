import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient'
import { AuthProvider, useAuth } from './AuthProvider'

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
            <div class="text-center">
                <h1 class="text-white text-7xl font-roboto">RUFree?</h1>
                <h2 class="text-white text-3xl font-roboto">Get involved on campus!</h2>
            </div>
            
            <Link class="text-white font-roboto" to="/about">About</Link>
            {user ? (
                <>
                    <p>Signed in as {user.email}</p>
                    <button onClick={signOut}>Sign out</button>
                </>
            ) : (
                <>
                    <p>Not signed in</p>
                    <button class="border-2 border-white rounded-lg border-solid p-2 w-34" onClick={signInWithGoogle}>Login</button>
                </>
            )}
        </div>   
    )
}

export default App;