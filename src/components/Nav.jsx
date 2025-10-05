import { supabase } from '../supabaseClient'
import { useRef, useEffect, useState } from 'react';
import { AuthProvider, useAuth } from '../auth/AuthProvider'
import { Navigate, useNavigate } from 'react-router-dom';
import NavButton from './NavButton'
import NavPopup from './NavPopup'

export default function Nav() {
    const navigate = useNavigate();

    const popupEle = useRef(null);
    const buttonEle = useRef(null);

    const { user } = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    function togglePopup() {
        setIsOpen((prev) => !prev);
    }

    useEffect(() => {
        function handleClickOutside(e) {
            if (popupEle.current &&
        !popupEle.current.contains(e.target) &&
        buttonEle.current &&
        !buttonEle.current.contains(e.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown",handleClickOutside);
        return () => {
            document.removeEventListener("mousedown",handleClickOutside);
        }
    },[])

    async function logout() {
        await supabase.auth.signOut();
        navigate("/");
    }

    async function toSettings() {
        navigate("/settings");
    }

    async function toDiscover() {
        navigate("/discovery");
    }

    async function toMyEvents() {
        navigate("/events")
    }

    if (!user) {
        return <Navigate to="/" />
    }

    return (
        <div className="sticky z-100 top-0 border-b-2 bg-darker-gray border-white flex w-full shadow-lg">
            <NavButton onclick={toDiscover} text="Discover"></NavButton>
            <NavButton onclick={toMyEvents} text="My Events"></NavButton>
            <NavButton refA={buttonEle} onclick={togglePopup} img={user.user_metadata.avatar_url} className={`absolute right-2`} text={user.user_metadata.full_name}></NavButton>
            <NavPopup onSettings={toSettings} onLogout={logout} id="navpopup" refA={ popupEle } className={`${isOpen ? "scale-100" : "scale-0"}`}></NavPopup>
        </div>
    )
}