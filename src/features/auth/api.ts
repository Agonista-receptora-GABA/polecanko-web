import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { apiFetch } from "@/lib/api";
import { useAuth } from "./auth-context";
import type { User } from "./types";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  user: User;
}

export function useLogin() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginPayload) =>
      apiFetch<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: ({ user }) => {
      setUser(user);
      navigate({ to: "/" });
    },
  });
}
