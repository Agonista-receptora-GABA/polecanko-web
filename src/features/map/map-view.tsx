import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import {
  usePreferences,
  type PreferencesContextValue,
} from "@/features/preferences/preferences-context";
import { useMapView } from "./map-view-context";

// TODO: Remove once there is data from the API.
const mockPlaces = [
  { id: "1", name: "Testowa Restauracja", lat: 52.2297, lng: 21.0122 },
  { id: "2", name: "Kolejna Knajpka", lat: 52.2319, lng: 21.0067 },
];

function getTilesProviderUrl(
  resolvedTheme: PreferencesContextValue["resolvedTheme"],
): string {
  const TILES_PROVIDER_URL =
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";

  return resolvedTheme === "light"
    ? TILES_PROVIDER_URL
    : TILES_PROVIDER_URL.replace("light_all", "dark_all");
}

function ViewSync() {
  const { setView } = useMapView();

  useMapEvents({
    moveend: (e) => {
      const map = e.target;
      const c = map.getCenter();
      setView([c.lat, c.lng], map.getZoom());
    },
  });

  return null;
}

export function MapView() {
  const { resolvedTheme } = usePreferences();
  const { center, zoom } = useMapView();

  const tilesProviderUrl = getTilesProviderUrl(resolvedTheme);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-full w-full"
      fadeAnimation={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={tilesProviderUrl}
      />
      {mockPlaces.map((place) => (
        <Marker key={place.id} position={[place.lat, place.lng]}>
          <Popup>{place.name}</Popup>
        </Marker>
      ))}

      <ViewSync />
    </MapContainer>
  );
}
