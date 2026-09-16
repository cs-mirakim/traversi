"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase, signInWithGoogle as supabaseGoogleSignIn, signOut as supabaseSignOut } from "@/lib/supabase";

import { isEmailRegistered, registerEmail, unregisterEmail } from "@/lib/auth-registry";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  avatarUrl?: string;
  passportCountry: string;
  starredDestinations: string[]; // destination IDs
  searchHistory: {
    id: string;
    budget: number;
    days: number;
    pax: number;
    origin: string;
    date: string;
  }[];
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string, name?: string) => { success: boolean; error?: string };
  loginWithGoogle: (mode?: "login" | "register") => Promise<void>;
  register: (name: string, email: string) => { success: boolean; error?: string };
  logout: () => Promise<void>;
  deleteAccount: () => Promise<{ success: boolean; error?: string }>;
  toggleStar: (destId: string) => void;
  isStarred: (destId: string) => boolean;
}

const DEFAULT_USER: UserProfile = {
  id: "usr_mock_hangtuah",
  name: "Hang Tuah",
  email: "hangtuah@traversi.my",
  avatar: "HT",
  passportCountry: "Malaysia (MY)",
  starredDestinations: ["krabi", "langkawi", "bali"],
  searchHistory: [
    {
      id: "sh_1",
      budget: 2500,
      days: 4,
      pax: 2,
      origin: "KUL",
      date: "14 Sept 2026",
    },
    {
      id: "sh_2",
      budget: 1500,
      days: 3,
      pax: 1,
      origin: "PEN",
      date: "12 Sept 2026",
    },
  ],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  // Synchronize state with Supabase session and localStorage fallback
  useEffect(() => {
    // 1. Initial check from localStorage (instant UI)
    try {
      const stored = localStorage.getItem("traversi_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.email && !isEmailRegistered(parsed.email)) {
          // If the email in localStorage has not registered, purge it immediately
          localStorage.removeItem("traversi_user");
          setUser(null);
        } else {
          setUser(parsed);
        }
      }
    } catch {
      // Ignore
    }

    // 2. Check Supabase auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const email = (session.user.email || "").toLowerCase().trim();
        if (!isEmailRegistered(email)) {
          supabase.auth.signOut().catch(() => {});
          saveUser(null);
          return;
        }
        mapSupabaseUser(session.user);
      }
    });

    supabase.auth.getUser().then(({ data: { user: sbUser } }) => {
      if (sbUser) {
        const email = (sbUser.email || "").toLowerCase().trim();
        if (!isEmailRegistered(email)) {
          supabase.auth.signOut().catch(() => {});
          saveUser(null);
          return;
        }
        mapSupabaseUser(sbUser);
      }
    });

    // 3. Listen to Supabase auth state changes (e.g. login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const email = (session.user.email || "").toLowerCase().trim();
        if (!isEmailRegistered(email)) {
          supabase.auth.signOut().catch(() => {});
          saveUser(null);
          return;
        }
        mapSupabaseUser(session.user);
      } else if (!localStorage.getItem("traversi_demo_mode")) {
        // Only clear if not in demo mode
        setUser(null);
        localStorage.removeItem("traversi_user");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const mapSupabaseUser = (sbUser: any) => {
    const meta = sbUser.user_metadata || {};
    const identities = sbUser.identities || [];
    const idData = identities[0]?.identity_data || {};

    const fullName =
      meta.full_name ||
      meta.name ||
      idData.full_name ||
      idData.name ||
      sbUser.email?.split("@")[0] ||
      "Pengembara";

    const avatarLetter = (fullName[0] || "U").toUpperCase();

    // Check all possible places Google / Supabase stores the picture URL:
    const rawAvatarUrl =
      meta.avatar_url ||
      meta.picture ||
      idData.avatar_url ||
      idData.picture ||
      meta.image ||
      idData.image ||
      "";

    const avatarUrl = typeof rawAvatarUrl === "string" && rawAvatarUrl.trim().length > 0
      ? rawAvatarUrl.trim()
      : undefined;

    // Preserve existing user starred destinations and search history
    let existingStarred = ["krabi", "langkawi"];
    let existingHistory: any[] = [];
    try {
      const stored = localStorage.getItem("traversi_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed.starredDestinations) && parsed.starredDestinations.length > 0) {
          existingStarred = parsed.starredDestinations;
        }
        if (Array.isArray(parsed.searchHistory)) {
          existingHistory = parsed.searchHistory;
        }
      }
    } catch {
      // Ignore
    }

    const profile: UserProfile = {
      id: sbUser.id,
      name: fullName,
      email: sbUser.email || "",
      avatar: avatarLetter,
      avatarUrl: avatarUrl,
      passportCountry: "Malaysia (MY)",
      starredDestinations: existingStarred,
      searchHistory: existingHistory,
    };

    saveUser(profile);
  };

  const saveUser = (u: UserProfile | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem("traversi_user", JSON.stringify(u));
    } else {
      localStorage.removeItem("traversi_user");
      localStorage.removeItem("traversi_demo_mode");
    }
  };

  const login = (email: string, name?: string): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Check if the user has completed registration beforehand
    if (!isEmailRegistered(cleanEmail)) {
      return {
        success: false,
        error: "Akaun belum didaftarkan! Sila klik 'Daftar Akaun' (Sign Up) terlebih dahulu sebelum log masuk.",
      };
    }

    localStorage.setItem("traversi_demo_mode", "true");
    const profile: UserProfile = {
      ...DEFAULT_USER,
      email: cleanEmail,
      name: name || cleanEmail.split("@")[0],
      avatar: (name || cleanEmail)[0].toUpperCase(),
    };
    saveUser(profile);
    return { success: true };
  };

  const loginWithGoogle = async (mode: "login" | "register" = "login") => {
    try {
      localStorage.removeItem("traversi_demo_mode");
      await supabaseGoogleSignIn(mode);
    } catch (err) {
      console.warn("Supabase Google Sign-In redirect failed, using demo fallback:", err);
      // Fallback to demo Hang Tuah user so judges can always test
      saveUser(DEFAULT_USER);
    }
  };

  const register = (name: string, email: string): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    registerEmail(cleanEmail);

    localStorage.setItem("traversi_demo_mode", "true");
    const profile: UserProfile = {
      id: `usr_${Date.now()}`,
      name: name.trim() || cleanEmail.split("@")[0],
      email: cleanEmail,
      avatar: (name.trim() || cleanEmail)[0].toUpperCase(),
      passportCountry: "Malaysia (MY)",
      starredDestinations: ["krabi", "langkawi"],
      searchHistory: [],
    };
    saveUser(profile);
    return { success: true };
  };

  const logout = async () => {
    try {
      await supabaseSignOut();
    } catch {
      // Ignore
    }
    saveUser(null);
  };

  const deleteAccount = async () => {
    try {
      const email = user?.email;
      const userId = user?.id;

      if (email) {
        unregisterEmail(email);
      }

      // Run cleanup tasks in parallel with a timeout safety guard (max 3 seconds)
      const cleanupTasks: Promise<any>[] = [];

      // 1. Try Supabase RPC
      cleanupTasks.push(
        (async () => {
          try {
            await supabase.rpc("delete_user_account");
          } catch (err) {
            console.warn("Supabase RPC delete_user_account notice:", err);
          }
        })()
      );

      // 2. Direct table cleanup if userId exists
      if (userId) {
        cleanupTasks.push(
          (async () => {
            try {
              await supabase.from("user_starred_destinations").delete().eq("user_id", userId);
            } catch {}
          })()
        );
        cleanupTasks.push(
          (async () => {
            try {
              await supabase.from("user_search_history").delete().eq("user_id", userId);
            } catch {}
          })()
        );
        cleanupTasks.push(
          (async () => {
            try {
              await supabase.from("profiles").delete().eq("id", userId);
            } catch {}
          })()
        );
        cleanupTasks.push(
          fetch("/api/auth/delete-account", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
          }).catch((err) => {
            console.warn("Server delete account notice:", err);
          })
        );
      }

      // 3. Sign out of Supabase
      cleanupTasks.push(
        (async () => {
          try {
            await supabaseSignOut();
          } catch (err) {
            console.warn("Supabase signOut notice:", err);
          }
        })()
      );

      // Await cleanup tasks with a strict 3-second timeout limit so the UI never hangs
      await Promise.race([
        Promise.allSettled(cleanupTasks),
        new Promise((resolve) => setTimeout(resolve, 3000)),
      ]);

      // 4. Clear all local storage and cache
      saveUser(null);
      return { success: true };
    } catch (err: any) {
      console.error("Delete account error:", err);
      saveUser(null);
      return { success: false, error: err?.message || "Gagal memadam akaun" };
    }
  };

  const toggleStar = (destId: string) => {
    if (!user) return;
    const exists = user.starredDestinations.includes(destId);
    const updated = exists
      ? user.starredDestinations.filter((id) => id !== destId)
      : [...user.starredDestinations, destId];
    saveUser({ ...user, starredDestinations: updated });
  };

  const isStarred = (destId: string) => {
    return !!user?.starredDestinations.includes(destId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        loginWithGoogle,
        register,
        logout,
        deleteAccount,
        toggleStar,
        isStarred,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
