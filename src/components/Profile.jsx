import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../supabaseClient';
import ScheduleGraph from '../components/ScheduleGraph'

export default function Profile({ firstTimeSetup }) {
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState("");
    const [availabilityMatrix, setAvailabilityMatrix] = useState(
        Array.from({ length: 48 }, () => Array(7).fill(0))
    );
    const [avatarUrl, setAvatarUrl] = useState("");
    const [userId, setUserId] = useState("");

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    useEffect(() => {
        async function fetchUser() {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.error(error);
                return;
            }
            if (user) {
                setUserId(user.id);
                setAvatarUrl(user.user_metadata?.avatar_url || "");

                const { data: profile } = await supabase
                    .from("Profiles")
                    .select("*")
                    .eq("id", user.id)
                    .single();

                if (profile) {
                    setDisplayName(profile.display_name || "");
                    if (profile.availability) {
                        setAvailabilityMatrix(profile.availability);
                    }
                }
            }
        }
        fetchUser();
    }, []);

    function toggleCell(row, col) {
        setAvailabilityMatrix(prev => {
            const newMatrix = prev.map(r => [...r]);
            newMatrix[row][col] = newMatrix[row][col] === 1 ? 0 : 1;
            return newMatrix;
        });
    }

    async function handleSave() {
        if (!userId) return;

        const { error } = await supabase.from("Profiles").upsert({
            id: userId,
            display_name: displayName,
            avatarurl: avatarUrl,
            availability: availabilityMatrix
        });

        if (error) {
            console.error(error);
            alert("Failed to save profile");
        } else {
            alert("Profile saved!");
            if (firstTimeSetup) {
                
                navigate("/discovery");
            }
        }
    }

    return (
        <div>
            <div class="text-center">
                <label class="text-white mr-5" >Display Name
                </label>
                <input class="rounded-lg text-darker-gray mb-3"
                        type="text"
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                    />
                </div>
            <p class="text-white text-center">Your Availability:</p>
            <ScheduleGraph canEdit availabilityMatrix={availabilityMatrix} setAvailabilityMatrix={setAvailabilityMatrix} />
            <div class="text-center">
                <button class="select-none mb-10 font-bold transition-all mt-10 bg-transparent hover:bg-white text-white hover:text-dark-gray border-2 border-white rounded-lg border-solid p-2 w-60 cursor-pointer hover:inset-shadow-innerbox active:inset-shadow-xs" onClick={handleSave}>Save Profile</button>
            </div>
        </div>
    );
}


/*
<table border="1">
                <thead>
                    <tr>
                        <th>Time</th>
                        {days.map((day, idx) => (
                            <th key={idx}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {availabilityMatrix.map((row, rowIndex) => {
                        const hour = Math.floor(rowIndex / 2);
                        const minutes = rowIndex % 2 === 0 ? "00" : "30";
                        const timeLabel = `${hour.toString().padStart(2,'0')}:${minutes}`;
                        return (
                            <tr key={rowIndex} class="h-10">
                                <td>{timeLabel}</td>
                                {row.map((cell, colIndex) => (
                                    <td key={colIndex}>
                                        <input
                                            type="checkbox"
                                            checked={cell === 1}
                                            onChange={() => toggleCell(rowIndex, colIndex)}
                                        />
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>

*/