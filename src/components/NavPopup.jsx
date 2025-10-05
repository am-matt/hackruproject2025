function NavPopupButton({ text }) {
    return (
        <button class="ml-2 text-black font-roboto">{text}</button>
    )
}

export default function NavPopup() {
    return (
        <div class="w-30 h-auto bg-white rounded-lg">
            <ul>
                <li>
                    <NavPopupButton text="Settings"></NavPopupButton>    
                </li>
                <li>
                <NavPopupButton text="Logout"></NavPopupButton>
                </li>
            </ul>
            
        </div>
    )
}