import { createFileRoute } from "@tanstack/react-router";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "@/lib/leaflet-icon-fix";

export const Route = createFileRoute("/_protected/discover")({
  component: DiscoverPage,
});

const TILES_PROVIDER_URL =
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";

// TODO: Remove once there is data from the API.
const mockPlaces = [
  { id: "1", name: "Testowa Restauracja", lat: 52.2297, lng: 21.0122 },
  { id: "2", name: "Kolejna Knajpka", lat: 52.2319, lng: 21.0067 },
];

function DiscoverPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <h1 className="p-4 text-xl font-semibold">Odkrywaj</h1>

      <div className="flex-1">
        <MapContainer
          center={[52.2297, 21.0122]}
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={TILES_PROVIDER_URL}
          />
          {mockPlaces.map((place) => (
            <Marker key={place.id} position={[place.lat, place.lng]}>
              <Popup>{place.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
