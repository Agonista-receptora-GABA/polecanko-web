import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { RouterContext } from "@/router";
import { BottomNav } from "@/components/bottom-nav";
import { MapViewProvider } from "@/features/map/map-view-context";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <main className="pb-16">
        <MapViewProvider>
          <Outlet />
        </MapViewProvider>
      </main>
      <BottomNav />
    </>
  );
}
