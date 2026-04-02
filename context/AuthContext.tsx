"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { User, AuthResponse } from "@/types";
import api from "@/lib/api";
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  clearTokens,
  isTokenExpired,
} from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (token: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updatedUser: Partial<User>) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data.data);
    } catch {
      clearTokens();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = getAccessToken();
    if (token && !isTokenExpired(token)) {
      fetchMe();
    } else {
      clearTokens();
      setIsLoading(false);
    }
  }, [fetchMe]);

  const login = async (email: string, password: string) => {
    const { data } = await api.post<{ data: AuthResponse }>("/auth/login", {
      email,
      password,
    });
    setAccessToken(data.data.accessToken);
    setRefreshToken(data.data.refreshToken);
    setUser(data.data.user);
  };

  const loginWithGoogle = async (token: string) => {
    const { data } = await api.post<{ data: AuthResponse }>(
      "/auth/google/login",
      { token },
    );
    setAccessToken(data.data.accessToken);
    setRefreshToken(data.data.refreshToken);
    setUser(data.data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const { data } = await api.post<{ data: AuthResponse }>("/auth/register", {
      name,
      email,
      password,
    });
    setAccessToken(data.data.accessToken);
    setRefreshToken(data.data.refreshToken);
    setUser(data.data.user);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      clearTokens();
      setUser(null);
    }
  };

  const updateUser = (updatedUser: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updatedUser });
    }
  };

  const refreshUser = useCallback(async () => {
    await fetchMe();
  }, [fetchMe]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        register,
        logout,
        updateUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { AuthContext };
