import { useCallback, useState } from "react";

type GeolocationStatus = "idle" | "loading" | "success" | "denied" | "error";

export function useGeolocation() {
  const [status, setStatus] = useState<GeolocationStatus>("idle");

  const requestLocation = useCallback((): Promise<[number, number] | null> => {
    if (!("geolocation" in navigator)) {
      setStatus("error");
      return Promise.resolve(null);
    }

    setStatus("loading");

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus("success");
          resolve([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          setStatus(
            error.code === error.PERMISSION_DENIED ? "denied" : "error",
          );
          resolve(null);
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
      );
    });
  }, []);

  return { status, requestLocation };
}
