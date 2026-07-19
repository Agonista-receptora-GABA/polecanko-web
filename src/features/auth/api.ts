import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { apiFetch } from "@/lib/api";
import { useAuth, type User } from "./auth-context";

export function useLogin() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      apiFetch<{ user: User }>("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: ({ user }) => {
      setUser(user);
      navigate({ to: "/" });
    },
  });
}
