import Profile from '../components/Profile'

export default function Setup() {
    return (
        <div>
            <h1 class="select-none text-center text-white font-roboto text-2xl mt-3 mb-3 font-semibold">Setup your Profile</h1>
            <Profile firstTimeSetup />
        </div>
        
    )
}