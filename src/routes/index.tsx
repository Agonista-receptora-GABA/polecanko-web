import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/logo.svg";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <img src={logo} alt="" />
          Polecanko
        </h1>
      </main>
    </>
  );
}
