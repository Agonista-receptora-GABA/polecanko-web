import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import type { QueryClient } from "@tanstack/react-query";

export const router = createRouter({
  routeTree,
  // filled up in <RouterProvider context={...}>
  context: { queryClient: null! },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export interface RouterContext {
  queryClient: QueryClient;
}
