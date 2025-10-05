import { use, useState } from "react";
import { supabase } from "../supabaseClient";

export default function CreateEvent(){

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

    }


    return(
        <>
            <h1 style={{textAlign: "center", color: "white", fontSize: "45px"}}>Create an Event</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label> Title:
                        <input type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                </div>
                
                 <div>
                    <label> Description:
                        <input type="text" 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        
                        />
                    </label>
                </div>

                 <div>
                    <label> Time Needed in Minutes:
                        <input type="number" 
                            value={windowSize}
                            onChange={(e) => setWindowSize(parseInt(e.target.value) )}
                            />
                    </label>
                </div>

                <div>
                    <label> Location:
                        <input type="text" 
                            value={location}
                            onChange={(e) => setLocation((e.target.value))}
                            />
                    </label>
                </div>

                <button type="submit"> Submit </button>
            </form>

            <h2>{ message } </h2>
        </>
    )
}