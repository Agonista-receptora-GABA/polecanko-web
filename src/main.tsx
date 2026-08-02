import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IconContext } from "@phosphor-icons/react";
import { AuthProvider } from "@/features/auth/auth-context";
import { PreferencesProvider } from "@/features/preferences/preferences-context";
import { router } from "./router";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <PreferencesProvider>
        <AuthProvider>
          <IconContext.Provider
            value={{ color: "currentColor", weight: "bold" }}
          >
            <RouterProvider router={router} context={{ queryClient }} />
          </IconContext.Provider>
        </AuthProvider>
      </PreferencesProvider>
    </QueryClientProvider>
  </StrictMode>,
);
