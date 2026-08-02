import { useState } from "react";
import { useMap } from "react-leaflet";
import { useGeolocation } from "./useGeolocation";
import { useMapView } from "./map-view-context";
import { LocateFixed, Loader2 } from "lucide-react";

export function LocateMeButton() {
  const map = useMap();
  const { setView } = useMapView();
  const { status, requestLocation } = useGeolocation();
  const [showDeniedMessage, setShowDeniedMessage] = useState(false);

  const handleClick = async () => {
    if (status === "denied") {
      setShowDeniedMessage(true);
      return;
    }

    const coords = await requestLocation();
    if (!coords) return;

    map.setView(coords, 15);
    setView(coords, 15);
  };

  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col items-end gap-2">
      <button
        onClick={handleClick}
        disabled={status === "loading"}
        className="rounded-md bg-white p-2 shadow-md hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="Wycentruj na mojej lokalizacji"
      >
        {status === "loading" ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <LocateFixed
            className={`h-5 w-5 ${status === "denied" ? "text-gray-400" : ""}`}
          />
        )}
      </button>

      {showDeniedMessage && status === "denied" && (
        <div className="max-w-56 rounded-md bg-white p-3 text-sm shadow-md dark:bg-gray-800">
          <p>Odmówiono dostępu do lokalizacji.</p>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Zezwól w ustawieniach przeglądarki, aby użyć tej funkcji.
          </p>
          <button
            onClick={() => setShowDeniedMessage(false)}
            className="mt-2 text-xs underline"
          >
            Zamknij
          </button>
        </div>
      )}
    </div>
  );
}
