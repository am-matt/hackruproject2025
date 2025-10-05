import { supabase } from '../supabaseClient'
import { useRef, useEffect, useState } from 'react';
import { AuthProvider, useAuth } from '../auth/AuthProvider'
import { Navigate } from 'react-router-dom';
import NavButton from './NavButton'
import NavPopup from './NavPopup'

export default function Nav() {
    const popupEle = useRef(null);
    const buttonEle = useRef(null);

    const { user } = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    if (!user) {
        return <Navigate to="/" />
    }

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

    return (
        <div className="border-b-2 bg-darker-gray border-white flex w-full shadow-lg">
            <NavButton text="Discover"></NavButton>
            <NavButton text="My Events"></NavButton>
            <NavButton refA={buttonEle} onclick={togglePopup} img={user.user_metadata.avatar_url} className={`absolute right-2`} text={user.user_metadata.full_name}></NavButton>
            <NavPopup id="navpopup" refA={ popupEle } className={`${isOpen ? "scale-100" : "scale-0"}`}></NavPopup>
        </div>
    )
}