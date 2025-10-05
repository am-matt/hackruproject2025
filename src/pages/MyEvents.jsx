import { Navigate, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav'
import { useEffect } from 'react';
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import Event from '../components/Event';


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
            <div class="flex flex-col items-center">
                <h2 class="select-none text-center text-white font-roboto text-2xl mt-3 font-semibold">My Events</h2>
                <button class="select-none font-bold transition-all mt-2 bg-transparent hover:bg-white text-white hover:text-dark-gray border-2 border-white rounded-lg border-solid p-2 w-40 cursor-pointer hover:inset-shadow-innerbox active:inset-shadow-xs" onClick={createNewEvent}>New Event</button>
            </div>
            
            
            {myEvents.length > 0 ? (
                <div class="flex flex-wrap justify-center">
                {myEvents.map((event) => {
                    return <Event key={event.id} event={event} deleteEvent={()=>{handleDelete(event.id)}} />
                })}
                </div>
            ) : (
                <p class="text-white font-roboto text-center mt-5 select-none">You haven't created any events yet.</p>
        )}
        </div>
    )
}

/*
<li key={event.id}>
                    <strong>{event.title}</strong> — {event.description}
                    <br />
                    <button onClick={() => handleDelete(event.id)}>Delete</button>
                    <br />
                    <br />
                    </li>
*/