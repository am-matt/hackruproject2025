// AuthCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);

      if (error) {
        console.error("OAuth error:", error.message);
      } else {
        console.log("Session stored:", data.session);
      }

      navigate("/"); // or wherever you want after login
    };

    handleCallback();
  }, [navigate]);

  return <p>Completing sign in...</p>;
}
