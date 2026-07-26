import { useState, type SubmitEvent } from "react";
import { z } from "zod";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/features/auth/api";
import { ApiError } from "@/lib/api";

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/login")({
  validateSearch: loginSearchSchema,
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { redirect } = Route.useSearch();
  const login = useLogin(redirect);

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    login.mutate({ email, password });
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-4 p-4">
      <h1 className="text-xl font-semibold">Zaloguj się</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Hasło</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {login.isError && (
          <p className="text-destructive text-sm">
            {login.error instanceof ApiError && login.error.status === 401
              ? "Nieprawidłowy email lub hasło"
              : "Coś poszło nie tak, spróbuj ponownie"}
          </p>
        )}

        <Button type="submit" disabled={login.isPending}>
          {login.isPending ? "Logowanie..." : "Zaloguj się"}
        </Button>
      </form>
    </div>
  );
}
