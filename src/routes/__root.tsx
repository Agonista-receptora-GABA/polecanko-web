import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { RouterContext } from "@/router";
import { BottomNav } from "@/components/bottom-nav";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <main className="pb-16">
        <Outlet />
      </main>
      <BottomNav />
    </>
  );
}
