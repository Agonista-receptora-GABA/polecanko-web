export const API_ENDPOINTS = {
  login: "/auth/login",
  register: "/auth/register",
  logout: "/auth/logout",
  me: "/auth/me",
} as const;

export type ApiEndpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS];

const publicAuthEndpoints: ApiEndpoint[] = [
  API_ENDPOINTS.login,
  API_ENDPOINTS.register,
];

export function isPublicAuthEndpoint(path: string): boolean {
  return publicAuthEndpoints.includes(path as ApiEndpoint);
}
