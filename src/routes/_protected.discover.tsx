import { createFileRoute } from "@tanstack/react-router";
import "@/lib/leaflet-icon-fix";
import { MapView } from "@/features/map/map-view";

export const Route = createFileRoute("/_protected/discover")({
  component: DiscoverPage,
});

function DiscoverPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <h1 className="p-4 text-xl font-semibold">Odkrywaj</h1>
      <div className="z-10 flex-1">
        <MapView />
      </div>
    </div>
  );
}
