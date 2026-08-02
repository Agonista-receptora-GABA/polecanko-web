export type Review = {
  title: string;
  body: string;
  status: "needs_clarification" | "pending" | "published" | "resigned_by_user";
  rating: number;
  cost: string | null;
  visitDate: string | null;
  confirmed: boolean | null;
  placeName: string | null;
};
