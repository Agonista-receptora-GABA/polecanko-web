import type { AnyRouter } from "@tanstack/react-router";

export function redirectToLogin(router: AnyRouter, path?: string) {
  const currentPath = path || router.state.location.href;
  router.navigate({ to: "/login", search: { redirect: currentPath } });
}
