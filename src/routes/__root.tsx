import { useState } from "react";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import type { RouterContext } from "@/router";
import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { MapViewProvider } from "@/features/map/map-view-context";
import { getRandomQuip } from "@/features/quips";
import logo from "@/assets/logo.svg";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: RootNotFoundComponent,
});

function RootComponent() {
  return (
    <>
      <main className="pb-16">
        <MapViewProvider>
          <Outlet />
        </MapViewProvider>
      </main>
      <BottomNav />
    </>
  );
}

function RootNotFoundComponent() {
  const [quip] = useState(getRandomQuip({ kind: "404" }));

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center gap-2 px-4">
        <h1 className="flex items-center text-2xl font-bold">Polec(i)anko!</h1>
        <img className="rotate-180" src={logo} alt="" />
        <h2 className="mt-2 text-xl font-semibold">{quip.title}</h2>
        <p className="text-muted-foreground max-w-sm italic">{quip.body}</p>
        <p className="mt-4 max-w-sm">
          A tak serio to ta strona nie istnieje, więc nie uda się tutaj odkryć
          żadnego nowego miejsca.
        </p>
        <Link to="/">
          <Button className="mt-4">Zabierzcie mnie stąd!</Button>
        </Link>
      </main>
    </>
  );
}
