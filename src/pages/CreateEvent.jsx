import { use, useState, useRef } from "react";
import { supabase } from "../supabaseClient";
import Nav from '../components/Nav'

export default function CreateEvent(){
    const descriptionTextArea = useRef(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [windowSize, setWindowSize] = useState("");
    const [location, setLocation] = useState("");
    const [message, setMessage] = useState("");


    async function handleSubmit(e){
        e.preventDefault();
        setMessage("")

        if (!title.trim() || !description.trim() || windowSize <= 0) {
            setMessage("Please fill in all fields with valid values.");
            return;
        }

        const { data: { session } } = await supabase.auth.getSession();

        if (!session || !session.user) {
        setMessage("You must be logged in to create an event.");
        return;
        }

        const organizerId = session.user.id;
        const windows = Math.ceil(windowSize/15)

        const {error} = await supabase.from("Events").insert([{
        title,
        description,
        windowSize: windows,
        organizer: organizerId,
        location
        }]);
        
        if(error){
            setMessage("Error creating event: " + error.message);
            return;
        }

        setMessage("Event Created Successfully!")
        setTitle("");
        setDescription("");
        setWindowSize("");
        setLocation("")
        descriptionTextArea.current.value = "";

    }


    return(
        <>
            <Nav />
            <h1 class="text-white text-2xl text-center mb-4 mt-4">Create an Event</h1>

            <form class="text-center" onSubmit={handleSubmit}>
                <table class="m-auto  text-left">
                <tr>
                    <td>
                        <label class="text-white text-base font-roboto text-semibold">Title</label>
                    </td>
                    <td>
                        <input class="transition-all mb-1 w-75 h-10 text-semibold font-roboto text-darker-gray ml-5 rounded-lg focus:inset-shadow-innerbox" type="text" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)}
                        />
                        </td>
                </tr>
                
                 <tr>
                    <td>
                        <label class="align-top text-white text-base font-roboto text-semibold">Description</label>
                    </td>
                    <td class="flex">
                        <textarea ref={descriptionTextArea} name="Description" onChange={
                            (e)=>
                                
                                setDescription(e.target.value)
                            } class="mb-1 transition-all text-darker-gray ml-5 w-75 h-20 text-sm rounded-lg focus:inset-shadow-innerbox"></textarea>
                    </td>
                </tr>

                <tr>
                    <td>
                        <label class="text-white text-base font-roboto text-semibold">Location</label>
                    </td>
                    <td>
                        <input class="mb-1 h-10 transition-all text-darker-gray w-75 ml-5 rounded-lg focus:inset-shadow-innerbox" type="text" 
                            value={location}
                            onChange={(e) => setLocation((e.target.value))}
                            />
                    </td>
                </tr>

                 <tr>
                    <td>
                        <label class="text-white text-base font-roboto text-semibold">Timeframe (in minutes)</label>
                    </td>
                    <td>
                        <input class="mb-1 w-30 h-10 transition-all text-semibold font-roboto text-darker-gray ml-5 rounded-lg focus:inset-shadow-innerbox" type="number" 
                            value={windowSize}
                            onChange={(e) => setWindowSize(parseInt(e.target.value) )}
                            />
                    </td>
                </tr>

                
                </table>

                <button type="submit" class="select-none font-bold transition-all mt-2 bg-transparent hover:bg-white text-white hover:text-dark-gray border-2 border-white rounded-lg border-solid p-2 w-40 cursor-pointer hover:inset-shadow-innerbox active:inset-shadow-xs"> Submit </button>
            </form>

            <h2 class="text-center text-white mt-1">{ message } </h2>
        </>
    )
}