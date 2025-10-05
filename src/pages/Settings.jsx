
import Profile from '../components/Profile'
import Nav from '../components/Nav'

export default function Settings() {
    return (
        <div>
            <nav>
                <Nav />
                <h1 class="select-none text-center text-white font-roboto text-2xl mt-3 mb-3 font-semibold">Settings</h1>
                <Profile />
            </nav>
        </div>
    )
}
