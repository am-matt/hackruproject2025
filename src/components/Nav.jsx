import { supabase } from '../supabaseClient'
import { AuthProvider, useAuth } from '../auth/AuthProvider'
import { Navigate } from 'react-router-dom';
import NavButton from './NavButton'
import NavPopup from './NavPopup'

export default function Nav() {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" />
    }
    console.log(user);

    return (
        <div class="border-b-2 bg-darker-gray border-white flex w-full shadow-lg">
            <NavButton text="Discover"></NavButton>
            <NavButton text="My Events"></NavButton>
            <NavButton img={user.user_metadata.avatar_url} className="absolute right-2" text={user.user_metadata.full_name}></NavButton>
            <NavPopup></NavPopup>
        </div>
    )
}