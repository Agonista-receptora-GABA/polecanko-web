import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { UserPreferences } from "./types";
import { loadPreferences, savePreferences } from "./storage";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export interface PreferencesContextValue {
  preferences: UserPreferences;
  setPreference: <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K],
  ) => void;
  resolvedTheme: "light" | "dark";
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] =
    useState<UserPreferences>(loadPreferences);
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) =>
      setSystemTheme(e.matches ? "dark" : "light");
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const resolvedTheme =
    preferences.theme === "system" ? systemTheme : preferences.theme;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, [resolvedTheme]);

  function setPreference<K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K],
  ) {
    setPreferences((prev) => {
      const next = { ...prev, [key]: value };
      savePreferences(next);
      return next;
    });
  }

  return (
    <PreferencesContext.Provider
      value={{ preferences, setPreference, resolvedTheme }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx)
    throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
}
