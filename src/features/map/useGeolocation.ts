import { useCallback, useEffect, useState } from "react";

type GeolocationStatus = "idle" | "loading" | "success" | "denied" | "error";

const GEO_OPTIONS: PositionOptions = {
  enableHighAccuracy: false,
  timeout: 10000,
  maximumAge: 60000,
};

function getPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, GEO_OPTIONS);
  });
}

export function useGeolocation() {
  const [status, setStatus] = useState<GeolocationStatus>("idle");

  useEffect(() => {
    if (!("permissions" in navigator)) return;

    let permissionStatus: PermissionStatus | null = null;

    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      permissionStatus = result;
      const handleChange = () => {
        if (result.state === "granted" || result.state === "prompt") {
          setStatus("idle");
        }
      };
      result.addEventListener("change", handleChange);
    });

    return () => {
      permissionStatus?.removeEventListener("change", () => {});
    };
  }, []);

  const requestLocation = useCallback(async (): Promise<
    [number, number] | null
  > => {
    if (!("geolocation" in navigator)) {
      setStatus("error");
      return null;
    }

    setStatus("loading");

    try {
      const position = await getPosition();
      setStatus("success");
      return [position.coords.latitude, position.coords.longitude];
    } catch (error) {
      const geoError = error as GeolocationPositionError;

      if (geoError.code === geoError.PERMISSION_DENIED) {
        setStatus("denied");
        return null;
      }

      try {
        const position = await getPosition();
        setStatus("success");
        return [position.coords.latitude, position.coords.longitude];
      } catch {
        setStatus("error");
        return null;
      }
    }
  }, []);

  return { status, requestLocation };
}
