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