import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import type { Session, User } from "@supabase/supabase-js";

export type Profile = {
  id: string;
  email: string | null;
  display_name: string | null;
  role: string | null;
  created_at: string;
  updated_at: string;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("loadProfile error:", error);
      setProfile(null);
      return;
    }

    setProfile(data as Profile);
  };

  const refreshProfile = async () => {
    const { data } = await supabase.auth.getSession();
    const u = data.session?.user;
    if (u) await loadProfile(u.id);
  };

useEffect(() => {
  let mounted = true;

  const init = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.getSession();

    if (!mounted) return;

    if (error) {
      setSession(null);
      setUser(null);
      setProfile(null);
      setLoading(false);
      return;
    }

    setSession(data.session);
    setUser(data.session?.user ?? null);

    if (data.session?.user) await loadProfile(data.session.user.id);
    else setProfile(null);

    if (mounted) setLoading(false);
  };

  init();

  const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
    if (!mounted) return;

    setLoading(true);
    setSession(session);
    const nextUser = session?.user ?? null;
    setUser(nextUser);

    if (nextUser) await loadProfile(nextUser.id);
    else setProfile(null);

    if (mounted) setLoading(false);
  });

  return () => {
    mounted = false;
    listener.subscription.unsubscribe();
  };
}, []);



  return (
    <AuthContext.Provider value={{ user, session, profile, loading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}


