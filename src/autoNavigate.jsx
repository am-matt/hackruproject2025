import { supabase } from './supabaseClient'
import { Navigate, useNavigate } from 'react-router-dom';

export default async function checkForProfile(source) {
    const navigate = useNavigate();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        console.log("No authenticated user");
        navigate("/");
    } else {
        //check if profile exists
        const { data: profile, error } = await supabase
        .from("Profiles")
        .select("*")
        .eq("id",user.id)
        .single();
        console.log(profile);

        if (profile) {
            if (source="/") {
                navigate("/discovery");
            }
        } else {
            navigate("/setup");
        }
    }
}