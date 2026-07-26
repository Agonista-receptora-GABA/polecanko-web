export type Theme = "light" | "dark" | "system";

export interface UserPreferences {
  theme: Theme;

  // another settings here, e.g.
  // language: "pl" | "en"
  // reviewsSortOrder: "newest" | "highest-rated"
}
