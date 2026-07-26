import { createFileRoute, Outlet } from "@tanstack/react-router";
import { router } from "@/router";
import { AUTH_QUERY_KEY, fetchMe } from "@/features/auth/auth-context";
import { redirectToLogin } from "@/lib/auth-redirect";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ context, location }) => {
    const user = await context.queryClient.ensureQueryData({
      queryKey: AUTH_QUERY_KEY,
      queryFn: fetchMe,
    });

    if (!user) {
      throw redirectToLogin(router, location.href);
    }
  },
  pendingComponent: () => (
    <div className="flex min-h-[50vh] items-center justify-center">
      Ładowanie...
    </div>
  ),
  component: () => <Outlet />,
});
