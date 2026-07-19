import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useApiFetch } from "@/lib/api";
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

export function useLogin(redirectTo?: string) {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();
  const apiFetch = useApiFetch();

  return useMutation({
    mutationFn: (data: LoginPayload) =>
      apiFetch<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: async ({ user }) => {
      setUser(user);
      await router.invalidate();
      navigate({ to: redirectTo?.startsWith("/") ? redirectTo : "/" });
    },
  });
}
