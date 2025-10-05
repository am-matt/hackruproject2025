import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import { supabase } from '../supabaseClient';

export default function Settings() {
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
        }
    }

    return (
        <div>
            <Nav />
            <h1>Settings</h1>
            <div>
                <label>Display Name:
                    <input
                        type="text"
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <img src={avatarUrl} alt="Avatar" width={100} height={100} />
            </div>
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
                            <tr key={rowIndex}>
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
            <button onClick={handleSave}>Save Profile</button>
        </div>
    );
}
