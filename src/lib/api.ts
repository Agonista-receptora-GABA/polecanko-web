import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { AUTH_QUERY_KEY } from "@/features/auth/auth-context";
import { isPublicAuthEndpoint } from "./api-endpoints";
import { redirectToLogin } from "./auth-redirect";

const API_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

export function useApiFetch() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return async function apiFetch<T>(
    path: string,
    init?: RequestInit,
  ): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, {
      // sends cookies cross-origin
      credentials: "include",
      headers: { "Content-Type": "application/json", ...init?.headers },
      ...init,
    });

    if (res.status === 401 && !isPublicAuthEndpoint(path)) {
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
      redirectToLogin(router);
      throw new ApiError(401, "Unauthorized");
    }

    if (!res.ok) {
      throw new ApiError(res.status, `API error: ${res.status}`);
    }

    return res.json();
  };
}
