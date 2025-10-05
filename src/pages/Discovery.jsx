import { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Event from '../components/Event'
import { supabase } from '../supabaseClient';

export default function Discovery() {
    const [eventsWithNames, setEventsWithNames] = useState([]);
    const [session, setSession] = useState(null);

    useEffect(() => {
        async function fetchEvents() {
            const { data: eventsData } = await supabase.from("Events").select("*");
            const enrichedEvents = await Promise.all(
            eventsData.map(async (event) => {
                const { data: profile } = await supabase
                .from("Profiles")
                .select("display_name, avatarurl")
                .eq("id", event.organizer)
                .single();
                return {
                ...event,
                organizerName: profile?.display_name || "Unknown Organizer",
                organizerAvatar: profile?.avatarurl || null
                };
            })
            );

            setEventsWithNames(enrichedEvents);
        }

        fetchEvents();
        supabase.auth.getSession().then(({ data }) => setSession(data.session));
    }, []);

    async function markInterested(eventId) {
        if (!session?.user) {
            alert("You must be logged in to mark interest.");
            return;
        }
        const userId = session.user.id;

        const { data: event } = await supabase
            .from("Events")
            .select("interested")
            .eq("id", eventId)
            .single();

        const currentInterested = event.interested || [];

        const updatedInterested = currentInterested.includes(userId)
            ? currentInterested.filter(id => id !== userId) // remove
            : [...currentInterested, userId];               // add


            const { error } = await supabase
                .from("Events")
                .update({ interested: updatedInterested })
                .eq("id", eventId);

            if (error) {
                console.error(error);
                return;
            }


            setEventsWithNames((prevEvents) =>
                prevEvents.map((e) =>
                    e.id === eventId ? { ...e, interested: updatedInterested } : e
                )
            );
        }
    

    
    
    return (
        <div>
            <Nav />
            <h1 class="select-none text-center text-white font-roboto text-2xl mt-3 font-semibold">All Events</h1>
            <div class="flex flex-wrap justify-center">
                {eventsWithNames.map((event) => {
                    return <Event key={event.id} event={event} session={session} onInterest={markInterested} />
                })}
            </div>
        </div>  
    )
    
}



/*<div key={event.id}>
                    <h2>Title: {event.title}</h2>
                    <p>Description: {event.description}</p>
                    <p>Location: {event.location}</p>
                    <p>Time {event.date_and_time ? <>: {event.date_and_time} </>:<>- Estimated: {event.windowSize * 15} </>}</p>
                    <p>Organizer: {event.organizerName}</p>
                    <p>People Interested: {event.interested?.length || 0}</p>
                    <button onClick={() => markInterested(event.id)}>
                        {event.interested?.includes(session.user.id) ? "Not Interested" : "I'm Interested"}
                    </button>
                    <br />
                    <br />
                </div>*/