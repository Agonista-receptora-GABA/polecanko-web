import type { UserPreferences } from "./types";

const STORAGE_KEY = "polecanko:preferences";

export const defaultPreferences: UserPreferences = {
  theme: "system",
};

export function loadPreferences(): UserPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPreferences;
    return { ...defaultPreferences, ...JSON.parse(raw) };
  } catch {
    return defaultPreferences;
  }
}

export function savePreferences(preferences: UserPreferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // e.g. private browsing (storage turned off) - just do nothing in that case
  }
}
