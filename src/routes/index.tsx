import { createFileRoute } from "@tanstack/react-router";
import "@/lib/leaflet-icon-fix";
import { MapView } from "@/features/map/map-view";
import logo from "@/assets/logo.svg";

export const Route = createFileRoute("/")({
  component: DiscoverPage,
});

function DiscoverPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <h1 className="flex items-center gap-2 p-4 text-xl font-semibold">
        <img className="size-8" src={logo} alt="" />
        <span>Odkrywaj</span>
      </h1>
      <div className="z-10 flex-1">
        <MapView />
      </div>
    </div>
  );
}
