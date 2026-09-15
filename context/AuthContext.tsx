"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
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
  login: (email: string, name?: string) => void;
  loginWithGoogle: () => void;
  register: (name: string, email: string) => void;
  logout: () => void;
  toggleStar: (destId: string) => void;
  isStarred: (destId: string) => boolean;
}

const DEFAULT_USER: UserProfile = {
  id: "usr_mock_1",
  name: "Amir Hakim",
  email: "amir@traversi.my",
  avatar: "AH",
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

  useEffect(() => {
    try {
      const stored = localStorage.getItem("traversi_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }
  }, []);

  const saveUser = (u: UserProfile | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem("traversi_user", JSON.stringify(u));
    } else {
      localStorage.removeItem("traversi_user");
    }
  };

  const login = (email: string, name?: string) => {
    const profile: UserProfile = {
      ...DEFAULT_USER,
      email,
      name: name || email.split("@")[0],
      avatar: (name || email)[0].toUpperCase(),
    };
    saveUser(profile);
  };

  const loginWithGoogle = () => {
    saveUser(DEFAULT_USER);
  };

  const register = (name: string, email: string) => {
    const profile: UserProfile = {
      id: `usr_${Date.now()}`,
      name,
      email,
      avatar: name.slice(0, 2).toUpperCase(),
      passportCountry: "Malaysia (MY)",
      starredDestinations: ["krabi", "langkawi"],
      searchHistory: [],
    };
    saveUser(profile);
  };

  const logout = () => {
    saveUser(null);
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
