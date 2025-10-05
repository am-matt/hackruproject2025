import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'
import { AuthProvider, useAuth } from '../auth/AuthProvider'
import { Navigate } from 'react-router-dom';
import checkForProfile from '../autoNavigate'

function Home() {
    const signInWithGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: `${window.location.origin}/auth/callback` }
        })
    }

    const signOut = async () => {
        await supabase.auth.signOut()
    }

    checkForProfile(window.location.pathname);

    /*const { user } = useAuth();

    if (user) {
        return <Navigate to="/discovery" />
    }*/
    

    return (
        <div>
            <div class="text-center pt-25">
                <h1 class="select-none font-bold text-white text-7xl font-roboto"><span class="text-red">RU</span>Free?</h1>
                <h2 class="select-none font-bold text-white text-3xl font-roboto">Get involved on campus!</h2>
                <button class="select-none font-bold transition-all mt-10 bg-transparent hover:bg-white text-white hover:text-dark-gray border-2 border-white rounded-lg border-solid p-2 w-60 cursor-pointer hover:inset-shadow-innerbox active:inset-shadow-xs" onClick={signInWithGoogle}>Log in with Google</button>
                <h3 class="select-none text-xs text-white">Only available to Rutgers students</h3>
            </div>
            
        </div>   
    )
}

export default Home;