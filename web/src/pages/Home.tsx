import { useAuth } from "../lib/AuthContext";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const { user, profile, loading } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;

  return (
    <div style={{ padding: 24 }}>
      <h1>AI Athletic Ecosystem</h1>

      <p>Status: {user ? `Logged in as ${user.email}` : "Not logged in"}</p>

      {user && (
        <>
          <p>Role: {profile?.role ?? "no role found"}</p>
          <p>Display name: {profile?.display_name ?? "none"}</p>

          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}








