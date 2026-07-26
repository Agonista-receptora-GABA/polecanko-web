import { useQuery } from "@tanstack/react-query";
import { useApiFetch } from "@/lib/api";
import type { Review } from "./types";

export function useMyReviews() {
  const apiFetch = useApiFetch();

  return useQuery({
    queryKey: ["reviews", "me"],
    queryFn: () => apiFetch<Review[]>("/reviews"),
  });
}
