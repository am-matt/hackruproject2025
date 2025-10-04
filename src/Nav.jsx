import { supabase } from './supabaseClient'
import { AuthProvider, useAuth } from './AuthProvider'

export default function Nav() {
    const { user } = useAuth();

    return (
        <div class="p-2 border-b-2 border-white">
            <button>RUFree</button>
            { user ? (
                <>
                    <p>Signed in</p>
                </>
            ) : (
                <>
                    <p>Not signed in</p>
                </>
            )}
            
        </div>
    )
}