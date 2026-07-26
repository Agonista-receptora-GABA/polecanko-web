import { createFileRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/features/auth/auth-context";
import { useMyReviews } from "@/features/reviews/api";

export const Route = createFileRoute("/_protected/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();
  const { data: reviews, isLoading, isError } = useMyReviews();

  const initials = user?.username?.slice(0, 2).toUpperCase() ?? "??";

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-6 p-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarFallback className="text-xl">{initials}</AvatarFallback>
        </Avatar>
        <h1 className="text-xl font-semibold">{user?.username}</h1>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Moje opinie</h2>

        {isLoading && (
          <p className="text-muted-foreground text-sm">Ładowanie...</p>
        )}

        {isError && (
          <p className="text-destructive text-sm">
            Nie udało się załadować opinii
          </p>
        )}

        {reviews?.length === 0 && (
          <p className="text-muted-foreground text-sm">
            Nie dodałeś jeszcze żadnej opinii
          </p>
        )}

        {reviews?.map((review) => (
          <div key={review.title} className="rounded-2xl border p-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">{review.placeName}</span>
              <span className="text-sm">{"⭐".repeat(review.rating)}</span>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">{review.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
