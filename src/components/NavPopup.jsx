function NavPopupButton({ text, classes, interactive }) {
    return (
        <button onClick={interactive} className={`flex text-sm p-1 align-center transition-bg pl-2 text-left text-dark-gray cursor-pointer font-roboto ${classes} w-full hover:bg-dark-gray/[10%] active:bg-dark-gray/[20%]`}>{text}</button>
    )
}

export default function NavPopup({ refA, className, onLogout, onSettings }) {
    return (
        <div ref={refA} className={`${className} transition-transform origin-top-left inset-shadow-innerbox shadow-lg absolute w-30 right-10 top-10 h-auto bg-white rounded-lg overflow-hidden`}>
            <ul>
                <li>
                    <NavPopupButton interactive={onSettings} text="Settings"></NavPopupButton>    
                </li>
                <li>
                    <NavPopupButton interactive={onLogout} classes="text-red" text="Logout"></NavPopupButton>
                </li>
            </ul>
            
        </div>
    )
}