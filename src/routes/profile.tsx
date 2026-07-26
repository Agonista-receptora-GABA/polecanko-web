import { createFileRoute } from "@tanstack/react-router";
import { AUTH_QUERY_KEY, fetchMe } from "@/features/auth/auth-context";
import { redirectToLogin } from "@/lib/auth-redirect";
import { router } from "@/router";

export const Route = createFileRoute("/profile")({
  beforeLoad: async ({ context, location }) => {
    const user = await context.queryClient.ensureQueryData({
      queryKey: AUTH_QUERY_KEY,
      queryFn: fetchMe,
    });

    if (!user) {
      throw redirectToLogin(router, location.href);
    }
  },
  component: RouteComponent,

  // TODO: Change to pathless layout route (e.g. _authenticated.tsx)
  pendingComponent: () => (
    <div className="flex min-h-[50vh] items-center justify-center">
      Ładowanie...
    </div>
  ),
});

function RouteComponent() {
  return <div>Hello "/profile"!</div>;
}
