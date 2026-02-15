import { useAuth } from "../lib/AuthContext";

export default function Admin() {
  const { user, profile } = useAuth();

  return (
    <div style={{ padding: 24 }}>
      <h1>Admin Dashboard</h1>
      <p>Logged in as: {user?.email}</p>
      <p>Role: {profile?.role}</p>
      <p>Only admins can see this page.</p>
    </div>
  );
}
