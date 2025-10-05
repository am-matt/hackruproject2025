import { Navigate, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav'

export default function MyEvents() {
    const navigate = useNavigate();

    function createNewEvent() {
        navigate("/newevent")
    }

    return (
        <div>
            <Nav />
            <button onClick={createNewEvent}>Create new event</button>
        </div>
    )
}