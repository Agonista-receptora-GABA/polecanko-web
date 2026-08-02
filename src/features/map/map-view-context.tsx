import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

type LatLng = [number, number];

type MapViewContextValue = {
  center: LatLng;
  zoom: number;
  setView: (center: LatLng, zoom: number) => void;
};

const MapViewContext = createContext<MapViewContextValue | null>(null);

const DEFAULT_CENTER: LatLng = [52.2297, 21.0122];
const DEFAULT_ZOOM = 12;

export function MapViewProvider({ children }: { children: ReactNode }) {
  const [center, setCenter] = useState<LatLng>(DEFAULT_CENTER);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  const setView = useCallback((c: LatLng, z: number) => {
    setCenter(c);
    setZoom(z);
  }, []);

  const value = useMemo(
    () => ({ center, zoom, setView }),
    [center, zoom, setView],
  );

  return (
    <MapViewContext.Provider value={value}>{children}</MapViewContext.Provider>
  );
}

export function useMapView() {
  const ctx = useContext(MapViewContext);
  if (!ctx) throw new Error("useMapView must be used within MapViewProvider");
  return ctx;
}
