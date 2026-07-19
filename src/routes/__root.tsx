import { createRootRoute, Outlet } from "@tanstack/react-router";
import { BottomNav } from "@/components/bottom-nav";

export const Route = createRootRoute({
  component: () => (
    <>
      <main className="pb-16">
        <Outlet />
      </main>
      <BottomNav />
    </>
  ),
});
