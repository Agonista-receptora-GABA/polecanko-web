import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import type { AuthContextValue } from "@/features/auth/auth-context";

const defaultAuthContext: AuthContextValue = {
  user: null,
  setUser: () => {
    throw new Error("setUser called before AuthProvider was mounted");
  },
};

export const router = createRouter({
  routeTree,
  // filled up in <RouterProvider context={...}>
  context: { auth: defaultAuthContext },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export interface RouterContext {
  auth: AuthContextValue;
}
