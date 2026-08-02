import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useMapView } from "./map-view-context";
import { LocateMeButton } from "./locate-me-button";

// TODO: Remove once there is data from the API.
const mockPlaces = [
  { id: "1", name: "Testowa Restauracja", lat: 52.2297, lng: 21.0122 },
  { id: "2", name: "Kolejna Knajpka", lat: 52.2319, lng: 21.0067 },
];

function getTilesProviderUrl(): string {
  const TILES_PROVIDER_URL =
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png";

  // Note: The dark mode is currently supported by a hue invertion trick.
  // That's why there's no other link for the dark mode tiles.
  // See styles.css
  return TILES_PROVIDER_URL;
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
  const { center, zoom } = useMapView();

  const tilesProviderUrl = getTilesProviderUrl();

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
      <LocateMeButton />
    </MapContainer>
  );
}
