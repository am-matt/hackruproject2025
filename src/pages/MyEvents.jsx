import { Navigate, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav'
import { useEffect } from 'react';
import { useState } from 'react';
import { supabase } from '../supabaseClient';


export default function MyEvents() {
    const navigate = useNavigate();
    const [myEvents, setMyEvents] = useState([]);

    function createNewEvent() {
        navigate("/newevent")
    }

    useEffect(() => {
        async function fetchMyEvents(){
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();
        if (userError) {
            console.error(userError);
            return;
        }

        const userId = user.id;

        const { data: eventsData, error: eventsError } = await supabase
            .from("Events")
            .select("*").eq("organizer", userId)

        if (eventsError) {
            console.error(eventsError);
            return;
        }


      setMyEvents(eventsData || []);
     }

     fetchMyEvents();
    }, [])

    async function handleDelete(eventId) {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    const { error } = await supabase.from('Events').delete().eq('id', eventId);
    if (error) {
      console.error(error);
      alert('Failed to delete event.');
      return;
    }

    
    setMyEvents((prev) => prev.filter((e) => e.id !== eventId));
  }


    return (
        <div>
            <Nav />
            <button onClick={createNewEvent}>Create new event</button>
            <br />
            <br />

            <h2>My Events</h2>
            <br />
            {myEvents.length > 0 ? (
                <ul>
                {myEvents.map((event) => (
                    <li key={event.id}>
                    <strong>{event.title}</strong> — {event.description}
                    <br />
                    <button onClick={() => handleDelete(event.id)}>Delete</button>
                    <br />
                    <br />
                    </li>
                ))}
                </ul>
            ) : (
                <p>You haven’t created any events yet.</p>
        )}
        </div>
    )
}