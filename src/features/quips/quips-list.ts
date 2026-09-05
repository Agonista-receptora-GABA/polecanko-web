import type { QuipKind, QuipRecord } from "./types";

export const QUIPS_BY_KIND: Map<QuipKind, QuipRecord[]> = new Map([
  [
    "404",
    [
      {
        title: "Jesteś poza mapą",
        body: "Masz 404 powody, by wrócić.",
      },
      {
        title: "Zgubiliśmy się, szukając tej strony",
        body: "Nawigacja przeliczała trasę 404 razy i się poddała.",
      },
    ],
  ],
]);
