import { createContext, useContext, type ReactNode } from "react";
import { useQuery, type QueryStatus } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/lib/api-endpoints";
import type { User } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

export interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  status: QueryStatus;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export async function fetchMe(): Promise<User | null> {
  const res = await fetch(`${API_URL}${API_ENDPOINTS.me}`, {
    credentials: "include",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.user;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    status,
  } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: fetchMe,
    // 5 minutes
    staleTime: 5 * 60 * 1000,
    // On 401 we don't want to retry - we're just logged out
    retry: false,
  });

  return (
    <AuthContext.Provider
      value={{ user: user ?? null, isLoading, isSuccess, isError, status }}
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
