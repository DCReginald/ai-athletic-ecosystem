import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();


  const signUp = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) setMessage(error.message);
    else setMessage("Account created! You can now sign in.");

    setLoading(false);
  };

  const signIn = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
  setMessage(error.message);
} else {
  setMessage("Logged in!");
  navigate("/"); 
}

    setLoading(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>LOGIN PAGE</h1>


      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: 12 }}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: 12 }}
      />

      <button onClick={signIn} disabled={loading}>
        Sign In
      </button>

      <button onClick={signUp} disabled={loading} style={{ marginLeft: 12 }}>
        Sign Up
      </button>

      {message && <p style={{ marginTop: 16 }}>{message}</p>}
    </div>
  );
}

