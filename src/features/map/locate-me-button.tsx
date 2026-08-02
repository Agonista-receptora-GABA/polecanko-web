import { useMap } from "react-leaflet";
import { LocateFixed, Loader2 } from "lucide-react";
import { useGeolocation } from "./useGeolocation";
import { useMapView } from "./map-view-context";

export function LocateMeButton() {
  const map = useMap();
  const { setView } = useMapView();
  const { status, requestLocation } = useGeolocation();

  const handleClick = async () => {
    const coords = await requestLocation();
    if (!coords) return;

    map.setView(coords, 15);
    setView(coords, 15);
  };

  return (
    <button
      onClick={handleClick}
      disabled={status === "loading"}
      className="absolute top-4 right-4 z-[1000] rounded-md bg-white p-2 shadow-md hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-800 dark:hover:bg-gray-700"
      aria-label="Wycentruj na mojej lokalizacji"
      title={
        status === "denied"
          ? "Odmówiono dostępu do lokalizacji — sprawdź ustawienia przeglądarki"
          : undefined
      }
    >
      {status === "loading" ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <LocateFixed className="h-5 w-5" />
      )}
    </button>
  );
}
