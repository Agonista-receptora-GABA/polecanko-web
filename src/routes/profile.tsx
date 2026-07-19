import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  beforeLoad: ({ context }) => {
    if (!context.auth.user) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/profile"!</div>;
}
